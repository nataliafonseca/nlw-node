
class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;
  }

}

export { SendMailController }
