import React, { useState,useContext } from 'react';
import { Button, Card, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, instancesRef } from '../../../config/firebase';
import  { NotificationContext } from '../../NotificationSnackbar';

const AddProduct = () => {
  const showNotification = useContext(NotificationContext);
  const productCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");

  const [product, setProduct] = useState({
    name: '',
    totalPrice: '',
    subtasks: [],
  });

  const updateSubtasks = (index, field, value) => {
    const updatedSubtasks = [...product.subtasks];
    updatedSubtasks[index][field] = value;
    return updatedSubtasks;
  };

  const handleChange = (field, value) => {
    setProduct(prevData => ({ ...prevData, [field]: value }));
  };

  const handleChangeSubtask = (index, field, value) => {
    setProduct(prevData => ({
      ...prevData,
      subtasks: updateSubtasks(index, field, value),
    }));
  };

  const addSubtask = () => {
    setProduct(prevData => ({
      ...prevData,
      subtasks: [...prevData.subtasks, { name: '', price: '' }],
    }));
  };

  const deleteSubtask = subtaskIndex => {
    const updatedSubtasks = product.subtasks.filter((_, index) => index !== subtaskIndex);
    setProduct(prevData => ({ ...prevData, subtasks: updatedSubtasks }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(productCollectionRef, product);
      showNotification('success', 'Product added successfully');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error while adding product');
    }
  };

  return (
    <Card sx={{ width: "92vw", minHeight: "70vh", p: 5 }}>
      <Typography variant="h5">
        Add Product/Service
      </Typography>

      <Grid container my={2} spacing={4}>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="standard"
              onChange={e => handleChange('name', e.target.value)}
            />
            <TextField
              label="Total Price"
              variant="standard"
              disabled
            />
            <Button variant="contained" sx={{ width: "200px" }} onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack p={4} spacing={2} alignItems="center" sx={{ borderRadius: "10px", backgroundColor: "#fbfbfb" }}>
            {product.subtasks.map((subtask, i) => (
              <Stack key={i} direction="row" spacing={2} alignItems="center">
                <TextField
                  label={`SubTask ${i + 1}`}
                  value={subtask.name}
                  variant="standard"
                  sx={{ width: "40vw" }}
                  onChange={e => handleChangeSubtask(i, 'name', e.target.value)}
                />
                <TextField
                  label={`SubTask ${i + 1} Price`}
                  value={subtask.price}
                  variant="standard"
                  onChange={e => handleChangeSubtask(i, 'price', e.target.value)}
                />
                <IconButton size="small" onClick={() => deleteSubtask(i)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              size="small"
              sx={{ width: "200px" }}
              onClick={addSubtask}
              endIcon={<AddCircleIcon />}
            >
              Add a sub task
            </Button>
          </Stack>
        </Grid>
      </Grid>

    </Card>
  );
};

export default AddProduct;
