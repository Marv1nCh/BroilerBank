export type User = {
  userId?: string;
  userPrincipleName?: string;
  displayName?: string;
  email?: string;
  givenName: string;
  surname: string;
};

export function emptyUser() {
  return {
    userPrincipleName: '',
    displayName: '',
    email: '',
    givenName: '',
    surname: '',
  };
}
