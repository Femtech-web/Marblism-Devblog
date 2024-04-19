export namespace ReactionApplicationEvent {
  export namespace ReactionCreated {
    export const key = 'reaction.application.reaction.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
