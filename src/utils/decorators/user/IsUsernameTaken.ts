import User from '@/pages/api/user/[[...user]]'
import UserService from '@/services/UserService'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsUsernameTakenConstraint implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
    return !(await UserService.IsUsernameTaken(value))
  }
}

export default function IsUsernameTaken(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUsernameTaken',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUsernameTakenConstraint,
    })
  }
}
