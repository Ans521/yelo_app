import * as Keychain from 'react-native-keychain';

const REFRESH_TOKEN_KEY = 'refresh_token';

export async function getRefreshToken() {
  try {
    const creds = await Keychain.getGenericPassword({ service: REFRESH_TOKEN_KEY });
    return creds ? creds.password : null;
  } catch {
    return null;
  }
}

export async function setRefreshToken(token) {
  try {
    await Keychain.setGenericPassword('refresh', token, { service: REFRESH_TOKEN_KEY });
    return true;
  } catch {
    console.log('error in the setRefreshToken');
    return false;
  }
}

export async function clearRefreshToken() {
  try {
    await Keychain.resetGenericPassword({ service: REFRESH_TOKEN_KEY });
    return true;
  } catch {
    return false;
  }
}
