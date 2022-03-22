type VariableErrorType = {
  missingVariables?: string[]
  wrongTypes?: string[]
};

export default class VariableError {
  private missingVariables: string[] = [];

  private wrongTypes: string[] = [];

  constructor(errors?: VariableErrorType) {
    this.missingVariables = (errors?.missingVariables || []);
    this.wrongTypes = (errors?.wrongTypes || []);
  }

  pushMissingVariable = (error: string) => { this.missingVariables.push(error); };

  pushWrongType = (error: string) => { this.wrongTypes.push(error); };

  throw = () => {
    if (this.missingVariables.length || this.wrongTypes.length) {
      const messageArray: string[] = [];

      if (this.missingVariables.length) {
        messageArray.push(
          `Missing environment variables:\n -${this.missingVariables.join('\n -')}`,
        );
      }
      if (this.wrongTypes.length) {
        messageArray.push(
          `Wrong environment variable types:\n -${this.wrongTypes.join('\n -')}`,
        );
      }

      throw new Error(`\n${messageArray.join('\n')}\n`);
    }
  };
}
