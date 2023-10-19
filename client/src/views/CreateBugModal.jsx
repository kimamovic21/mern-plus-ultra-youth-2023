import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";

const CreateBugModal = ({ open, setIsCreateBugModalOpen }) => {
    const [ title, setTitle ] = useState('');
    const [steps, setSteps] = useState('');
    
    return (
        <Dialog onClose={() => setIsCreateBugModalOpen(false)} open={open}>
            <DialogTitle>Create bug</DialogTitle>
            <DialogContent sx={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <TextField 
                    label='title' 
                    value={title} 
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setTitle(e.target.value)
                    }}
                />
                <TextField 
                    label='steps' 
                    value={steps} 
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setSteps(e.target.value)
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateBugModal;