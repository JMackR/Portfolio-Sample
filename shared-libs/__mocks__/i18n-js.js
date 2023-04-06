const i18n = jest.createMockFromModule('i18n-js');

const translate = (text) => text;

i18n.translate = translate;

module.exports = i18n;