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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Policy {
  id: number;
  name: string;
  description: string;
  workloadId: number;
  workloadName: string;
  rules: PolicyRule[];
  priority: number;
  isEnabled: boolean;
}

interface PolicyRule {
  id: number;
  type: 'allow' | 'deny';
  source: string;
  destination: string;
  protocol: string;
  port: string;
}

const mockPolicies: Policy[] = [
  {
    id: 1,
    name: 'Frontend to Backend',
    description: 'Allow frontend to communicate with backend',
    workloadId: 1,
    workloadName: 'frontend-service',
    rules: [
      {
        id: 1,
        type: 'allow',
        source: '10.0.0.1',
        destination: '10.0.0.2',
        protocol: 'TCP',
        port: '8080',
      },
    ],
    priority: 1,
    isEnabled: true,
  },
];

const Policies: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleAddPolicy = () => {
    setSelectedPolicy(null);
    setOpenDialog(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setOpenDialog(true);
  };

  const handleDeletePolicy = (id: number) => {
    setPolicies(policies.filter(p => p.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPolicy(null);
  };

  const handleSavePolicy = (policy: Policy) => {
    if (selectedPolicy) {
      setPolicies(policies.map(p => p.id === policy.id ? policy : p));
    } else {
      setPolicies([...policies, { ...policy, id: policies.length + 1 }]);
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Policies</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPolicy}
        >
          Add Policy
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Workload</TableCell>
              <TableCell>Rules</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.name}</TableCell>
                <TableCell>{policy.description}</TableCell>
                <TableCell>{policy.workloadName}</TableCell>
                <TableCell>
                  {policy.rules.map((rule, index) => (
                    <Chip
                      key={index}
                      label={`${rule.type} ${rule.protocol}:${rule.port}`}
                      color={rule.type === 'allow' ? 'success' : 'error'}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>{policy.priority}</TableCell>
                <TableCell>
                  <Chip
                    label={policy.isEnabled ? 'Enabled' : 'Disabled'}
                    color={policy.isEnabled ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditPolicy(policy)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeletePolicy(policy.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPolicy ? 'Edit Policy' : 'Add Policy'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={selectedPolicy?.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              defaultValue={selectedPolicy?.description}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Workload</InputLabel>
              <Select
                label="Workload"
                defaultValue={selectedPolicy?.workloadId}
              >
                <MenuItem value={1}>frontend-service</MenuItem>
                <MenuItem value={2}>backend-service</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Priority"
              type="number"
              defaultValue={selectedPolicy?.priority}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={selectedPolicy?.isEnabled}
                />
              }
              label="Enabled"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleSavePolicy(selectedPolicy || {
              id: 0,
              name: '',
              description: '',
              workloadId: 0,
              workloadName: '',
              rules: [],
              priority: 0,
              isEnabled: true,
            })}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Policies; 