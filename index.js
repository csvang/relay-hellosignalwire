import 'dotenv/config';
import { Voice } from '@signalwire/realtime-api';

const client = new Voice.Client({
    project: process.env.PROJECT,
    token: process.env.TOKEN,
    contexts: ["hellosignalwire"]
})

client.on("call.received", async (call) => {
    console.log(`[CALL INFO] ${call.from} to ${call.to}`);

    try {
        // Answer Call
        await call.answer(); 
        
        // Say Hello SignalWire
        const playBack = await call.playTTS({ 
            text: "Hello SignalWire"
        });
        
        // Wait for playback to end.
        await playBack.waitForEnded();

        // End Call
        await call.hangup();

    } catch (err) {

        console.error(`[ERROR] ${err}`);

    }
})