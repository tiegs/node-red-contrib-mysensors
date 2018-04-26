import { IMysensorsMsg, INodeMessage } from './mysensors-msg';
import { NullCheck } from './nullcheck';

export class MysensorsSerial {
    public static decode(msg: INodeMessage): IMysensorsMsg| undefined {
        let message = msg.payload.toString();
        message = message.replace(/(\r\n|\n|\r)/gm, '');
        let tokens = message.split(';');
        let msgOut = msg as IMysensorsMsg;
        if(tokens.length == 6)
        {
            msgOut.nodeId = parseInt(tokens[0]);
            msgOut.childSensorId = parseInt(tokens[1]);
            msgOut.messageType = parseInt(tokens[2]);
            msgOut.ack = tokens[3] === '1'? 1:0;
            msgOut.subType = parseInt(tokens[4]);
            msgOut.payload = tokens[5];
            return msgOut;
        }
    }

    public static encode(msg: IMysensorsMsg): INodeMessage| undefined {
        if (NullCheck.isDefinedOrNonNull(msg) && NullCheck.isDefinedOrNonNull(msg.nodeId)) {
            msg.payload = msg.nodeId+';'+msg.childSensorId+';'+msg.messageType+';'+msg.ack+';'+msg.subType+';'+msg.payload;
            return msg;
        }
    }
}
