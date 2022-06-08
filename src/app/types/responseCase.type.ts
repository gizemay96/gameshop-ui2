export class responseCase {
     responseMessage: string;
     payload: any;
     isSucceed: boolean;
     statusCode: number

     constructor(obj: any) {
          this.payload = obj || null;
     }

}