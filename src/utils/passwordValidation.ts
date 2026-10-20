import { z } from 'zod';

// Top 100 most common passwords that should be blocked
const COMMON_PASSWORDS = new Set([
  'password', 'password1', 'password123', '123456', '12345678', '123456789',
  '1234567890', 'qwerty', 'qwerty123', 'abc123', 'monkey', 'letmein',
  'dragon', 'master', 'login', 'hello', 'welcome', 'princess', 'sunshine',
  'flower', 'football', 'baseball', 'hockey', 'soccer', 'basketball',
  'iloveyou', 'trustno1', 'whatever', 'shadow', 'superman', 'batman',
  'michael', 'jennifer', 'jordan', 'thomas', 'robert', 'daniel', 'ashley',
  'admin', 'administrator', 'root', 'guest', 'test', 'user', 'demo',
  'default', 'passw0rd', 'p@ssword', 'p@ssw0rd', 'changeme', 'secret',
  'computer', 'internet', 'server', 'network', 'database', 'system',
  '111111', '000000', '123123', '654321', '696969', '121212', '1q2w3e',
  'qwertyuiop', 'asdfgh', 'zxcvbn', 'asdfghjkl', '1qaz2wsx', 'qazwsx',
  'summer', 'winter', 'spring', 'autumn', 'january', 'monday',
  'love', 'money', 'power', 'freedom', 'winner', 'loser', 'killer',
  'matrix', 'starwars', 'pokemon', 'mario', 'zelda', 'minecraft',
  'google', 'facebook', 'twitter', 'amazon', 'apple', 'microsoft',
  'password!', 'password1!', 'welcome1', 'welcome123', 'letmein1',
]);

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0-4 (weak, fair, good, strong, excellent)
  requirements: PasswordRequirement[];
  feedback: string;
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const requirements: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'At least 12 characters',
      met: password.length >= 12,
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'One number',
      met: /\d/.test(password),
    },
    {
      id: 'special',
      label: 'One special character (!@#$%^&*)',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
    {
      id: 'notCommon',
      label: 'Not a common password',
      met: !COMMON_PASSWORDS.has(password.toLowerCase()),
    },
  ];

  const metCount = requirements.filter(r => r.met).length;
  const isValid = requirements.every(r => r.met);

  // Score calculation (0-4)
  let score = 0;
  if (metCount >= 2) score = 1;
  if (metCount >= 4) score = 2;
  if (metCount >= 5) score = 3;
  if (metCount === 6 && password.length >= 16) score = 4;

  // Feedback message
  let feedback = '';
  if (!isValid) {
    const unmet = requirements.filter(r => !r.met);
    if (unmet.length > 0) {
      feedback = `Missing: ${unmet.map(r => r.label.toLowerCase()).join(', ')}`;
    }
  } else if (score < 4) {
    feedback = 'Consider using 16+ characters for maximum security';
  } else {
    feedback = 'Excellent password strength';
  }

  return { isValid, score, requirements, feedback };
};

export const getStrengthLabel = (score: number): string => {
  switch (score) {
    case 0: return 'Weak';
    case 1: return 'Fair';
    case 2: return 'Good';
    case 3: return 'Strong';
    case 4: return 'Excellent';
    default: return 'Weak';
  }
};

export const getStrengthColor = (score: number): string => {
  switch (score) {
    case 0: return 'bg-red-500';
    case 1: return 'bg-orange-500';
    case 2: return 'bg-yellow-500';
    case 3: return 'bg-green-500';
    case 4: return 'bg-emerald-600';
    default: return 'bg-zinc-300';
  }
};

// Zod schema for password validation
export const strongPasswordSchema = z.string().refine(
  (password) => validatePassword(password).isValid,
  { message: 'Password does not meet security requirements' }
);
