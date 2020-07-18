module.exports = function ValidationError(message) {
    // Função construtora responsável pelos erros de validação
    this.name = "Validation Error";
    this.message = message;
};