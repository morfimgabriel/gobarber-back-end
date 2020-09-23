import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import Tooltip from '../Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsfocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsfocused(true);
  }, []);

  // Validacao se o campo esta populado para atribuir o css
  const handleInputBlur = useCallback(() => {
    setIsfocused(false);
    setisFilled(!!inputRef.current?.value);
  }, []);

  // quando o componente (input) exibir em tela, estrutura os dados para ser usado ex {name: '', email:'' password: ''}
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, // da acesso ao input
      path: 'value',
    });
  }, [fieldName, registerField]);

  // isErrored verifica se existe um error para acrescentar a cor vermelha no campo para indicar o erro
  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
