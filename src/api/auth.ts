import { apiRequest, authHeaders } from './client';

export async function login(email: string, password: string) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
}

export async function register(fullName: string, email: string, password: string) {
  return apiRequest('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email: email.trim().toLowerCase(), password }),
  });
}

export async function verifyOtp(email: string, otp: string) {
  return apiRequest('/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), otp }),
  });
}

export async function forgotPassword(email: string) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
}

export async function verifyResetOtp(email: string, otp: string) {
  return apiRequest('/auth/verify-reset-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), otp }),
  });
}

export async function resetPassword(resetToken: string, newPassword: string) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, newPassword }),
  });
}

export async function getProfile(token: string) {
  return apiRequest('/auth/profile', { headers: authHeaders(token) });
}

export async function deleteAccount(token: string) {
  return apiRequest('/auth/account', { method: 'DELETE', headers: authHeaders(token) });
}
