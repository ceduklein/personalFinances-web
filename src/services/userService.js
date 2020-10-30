import api from '../api/api';
import ValidationError from '../exception/validationError';

const apiUrl = '/api/users'

export default class UserService {

authenticate(loginBody) {
    return api.post(`${apiUrl}/signin`, loginBody);
  }

  save(user) {
    return api.post(`${apiUrl}/signup`, user);
  }

  validate(user) {
    const errors = [];

    if(!user.name) {
      errors.push('Por favor preencha o campo nome.');
    }

    if(!user.username) {
      errors.push('Por favor informe um nome de usuário.')
    }

    if(!user.email || !user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      errors.push('Por favor informe um e-mail válido.');
    }

    if(!user.pass || !user.passConfirmation) {
      errors.push("Os dois campos de senha devem ser preenchidos.");
    } else if (user.pass !== user.passConfirmation) {
      errors.push("A senhas digitadas não são iguais.");
    }

    if(errors && errors.length > 0) {
      throw new ValidationError(errors);
    }
  }
}