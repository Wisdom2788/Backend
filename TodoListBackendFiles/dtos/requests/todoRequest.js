class TodoRequest {
  constructor(text) {
    this.text = text;
  }

  validate() {
    if (!this.text || this.text.trim() === '') {
      throw new Error('Task text is required');
    }
  }
}

module.exports = TodoRequest;