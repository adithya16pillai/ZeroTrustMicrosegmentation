import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

interface Workload {
  id: number;
  name: string;
  namespace: string;
  type: string;
  status: string;
  ipAddress: string;
  labels: string[];
}

const mockWorkloads: Workload[] = [
  {
    id: 1,
    name: 'frontend-service',
    namespace: 'default',
    type: 'pod',
    status: 'running',
    ipAddress: '10.0.0.1',
    labels: ['app=frontend', 'env=prod'],
  },
  {
    id: 2,
    name: 'backend-service',
    namespace: 'default',
    type: 'pod',
    status: 'running',
    ipAddress: '10.0.0.2',
    labels: ['app=backend', 'env=prod'],
  },
];

const Workloads: React.FC = () => {
  const [workloads, setWorkloads] = useState<Workload[]>(mockWorkloads);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkload, setSelectedWorkload] = useState<Workload | null>(null);

  const handleAddWorkload = () => {
    setSelectedWorkload(null);
    setOpenDialog(true);
  };

  const handleEditWorkload = (workload: Workload) => {
    setSelectedWorkload(workload);
    setOpenDialog(true);
  };

  const handleDeleteWorkload = (id: number) => {
    setWorkloads(workloads.filter(w => w.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedWorkload(null);
  };

  const handleSaveWorkload = (workload: Workload) => {
    if (selectedWorkload) {
      setWorkloads(workloads.map(w => w.id === workload.id ? workload : w));
    } else {
      setWorkloads([...workloads, { ...workload, id: workloads.length + 1 }]);
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Workloads</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddWorkload}
        >
          Add Workload
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Labels</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workloads.map((workload) => (
              <TableRow key={workload.id}>
                <TableCell>{workload.name}</TableCell>
                <TableCell>{workload.namespace}</TableCell>
                <TableCell>{workload.type}</TableCell>
                <TableCell>
                  <Chip
                    label={workload.status}
                    color={workload.status === 'running' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{workload.ipAddress}</TableCell>
                <TableCell>
                  {workload.labels.map((label, index) => (
                    <Chip
                      key={index}
                      label={label}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditWorkload(workload)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteWorkload(workload.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton size="small">
                    <SecurityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedWorkload ? 'Edit Workload' : 'Add Workload'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={selectedWorkload?.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Namespace"
              defaultValue={selectedWorkload?.namespace}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Type"
              defaultValue={selectedWorkload?.type}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="IP Address"
              defaultValue={selectedWorkload?.ipAddress}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleSaveWorkload(selectedWorkload || {
              id: 0,
              name: '',
              namespace: '',
              type: '',
              status: 'running',
              ipAddress: '',
              labels: [],
            })}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Workloads; 