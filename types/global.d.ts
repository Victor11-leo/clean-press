export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean,
      phone:number,
      plan:string,
      role:string
    }
  }
}