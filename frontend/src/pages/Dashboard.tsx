import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Mock data for demonstration
const trafficData = [
  { name: 'Mon', allowed: 4000, denied: 2400 },
  { name: 'Tue', allowed: 3000, denied: 1398 },
  { name: 'Wed', allowed: 2000, denied: 9800 },
  { name: 'Thu', allowed: 2780, denied: 3908 },
  { name: 'Fri', allowed: 1890, denied: 4800 },
  { name: 'Sat', allowed: 2390, denied: 3800 },
  { name: 'Sun', allowed: 3490, denied: 4300 },
];

const workloadStats = [
  { name: 'Total Workloads', value: 156 },
  { name: 'Active Policies', value: 89 },
  { name: 'Security Violations', value: 12 },
  { name: 'Compliance Score', value: '92%' },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {workloadStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.name}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'background.paper',
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {stat.name}
              </Typography>
              <Typography component="p" variant="h4">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Traffic Analysis
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="allowed" fill="#4caf50" />
                <Bar dataKey="denied" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Security Trends
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="denied"
                  stroke="#f44336"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 