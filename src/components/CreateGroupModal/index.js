import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Modal, TextField, Typography } from "@mui/material";
import { FieldArray, Form, Formik, FormikProvider, useFormik } from "formik";
import { useContext } from "react";
import { createGroup } from "../../api/groupApi";
import "./CreateGroupModal.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateGroupModal(props) {

  const { open, handleClose } = props;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: "75vh",
    overflow: "auto"
  };

  const formik = useFormik({
    initialValues: {
      name: 'Foo Bar',
      users: []
    },
    onSubmit: (values) => {
      createGroup(values, user)
        .then(resp => resp.json())
        .then(body => navigate(`/group/${body.id}`));
      toast.success("Group created");
    },
  });

  return <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
          Create Group
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField 
                label="Group Name" 
                fullWidth 
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <FormikProvider value={formik}>
            <FieldArray
             name="users"
             render={arrayHelpers => (
                <div>
                  {formik.values.users && formik.values.users.length > 0 ? (
                    formik.values.users.map((user, index) => (
                      <div key={index}>
                        <TextField 
                          name={`users[${index}]`} 
                          value={user}
                          onChange={formik.handleChange}
                        />
                        <Button
                          variant="contained"
                          onClick={() => arrayHelpers.remove(index)} 
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => arrayHelpers.push('')} 
                        >
                          +
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button type="button" onClick={() => arrayHelpers.push('')}>
                      Add a User
                    </Button>
                  )}
                </div>
              )}
            />
            </FormikProvider>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">Create Group</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
}