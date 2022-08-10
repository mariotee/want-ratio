import React from 'react';

import {
    Button,
    InputLabel,
    Paper,
    TextField,    
} from '@mui/material';

import './App.css';

const round = (input: number, decimals: number): number => Math.ceil(input * Math.pow(10, decimals)) / Math.pow(10, decimals);

const TWD = (total: number, wins: number, desired: number) => round((desired*total - wins)/(1 - desired), 1);

const TRD = (total: number, ratio: number, desired: number) => round((total*(desired-ratio))/(1-desired), 1);

export function App() {
    const [total, setTotal] = React.useState<number|undefined>(undefined);
    const [wins, setWins] = React.useState<number|undefined>(undefined);
    const [ratio, setRatio] = React.useState<number|undefined>(undefined);
    const [desired, setDesired] = React.useState<number|undefined>(0.5);
    const [needed, setNeeded] = React.useState<number|undefined>(undefined);

    

    React.useEffect(() => {
        if (desired === 1.0) {
            alert('get real');
            
            setDesired(0);

            return;
        }

        if (total && wins) {
            setRatio(round(wins/total, 8));
        } else if (total && ratio) {
            setWins(round(total*ratio, 0));
        }

        if (total && wins && total <= wins)  {
            setWins(total - 1);
        }
        
        if (desired && ratio && desired < ratio) {            
            setDesired(round(ratio + 0.01, 2));                        
        }

        

        if (total && wins && desired) {
            setNeeded(TWD(total, wins, desired));
        } else if (total && ratio && desired) {
            setNeeded(TRD(total, ratio, desired));
        } else {
            setNeeded(undefined);
        }

    }, [total, wins, ratio, desired, needed])

    const Reset = () => {
        setTotal(undefined);
        setWins(undefined);
        setRatio(undefined);
        setDesired(0.5);        
    }

    const fieldStyle = {
        width: '12rem',
    }

    return <Paper>
        <InputLabel>Total Games</InputLabel>
        <TextField style={fieldStyle} type='number' value={total ?? ''} onChange={(e) => setTotal(Number.parseInt(e.target.value))} 
            inputProps={{inputMode: 'numeric', min: 0, step: 1 }} />

        <InputLabel>Current Wins</InputLabel>
        <TextField style={fieldStyle} type='number' value={wins ?? ''} onChange={(e) => setWins(Number.parseInt(e.target.value))} 
            inputProps={{inputMode: 'numeric', min: 0, max: (total ?? 1) - 1, step: 1 }} />

        <InputLabel>Current Ratio</InputLabel>
        <TextField style={fieldStyle} type='number' value={ratio ?? ''} onChange={(e) => setRatio(Number.parseFloat(e.target.value))} 
            inputProps={{inputMode: 'numeric', min: 0, max: 0.99, step: 0.01 }} />

        <InputLabel>Desired Ratio</InputLabel>
        <TextField style={fieldStyle} type='number' value={desired ?? ''} onChange={(e) => setDesired(Number.parseFloat(e.target.value))} 
            inputProps={{inputMode: 'numeric', min: ratio ?? 0 , step: 0.01 }} />

        <InputLabel>Wins Needed</InputLabel>
        <TextField style={fieldStyle} value={needed ?? ''} disabled />

        <Button style={{display: 'block'}} onClick={Reset}>Reset</Button>
    </Paper>
}
