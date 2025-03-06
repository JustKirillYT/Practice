module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Настройка для обработки TypeScript файлов
      '^.+\\.js$': 'babel-jest', // Настройка для обработки JavaScript файлов
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Оставить axios для преобразования
    ],
    moduleNameMapper: {
      '^axios$': require.resolve('axios'), // Если требуется сделать мок для axios
      
    },
    testEnvironment: 'jsdom', // Установить среду тестирования для React
  };
  