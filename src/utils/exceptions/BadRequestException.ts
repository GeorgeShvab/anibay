export default class BadRequestException extends Error {
  message: string
  data: any

  constructor(message: string, data: any) {
    super(message, data)

    this.message = message
    this.data = data
  }
}
