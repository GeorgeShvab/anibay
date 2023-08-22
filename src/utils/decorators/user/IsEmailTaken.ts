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
export class IsEmailTakenConstraint implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
    return !(await UserService.isEmailTaken(value))
  }
}

export default function IsEmailTaken(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailTaken',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailTakenConstraint,
    })
  }
}
