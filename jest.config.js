export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        // '^.+\\.(css|scss|sass|less)$': 'jest-transform-stub',
        // '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',  // Alias support
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    globals: {
        'import.meta.env': {
            VITE_API_URL: 'http://localhost:5175'  // Mock Vite env vars
        }
    },
};