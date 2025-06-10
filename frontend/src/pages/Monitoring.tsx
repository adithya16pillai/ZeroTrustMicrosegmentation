import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock data for demonstration
const trafficData = [
  { time: '00:00', allowed: 4000, denied: 2400 },
  { time: '04:00', allowed: 3000, denied: 1398 },
  { time: '08:00', allowed: 2000, denied: 9800 },
  { time: '12:00', allowed: 2780, denied: 3908 },
  { time: '16:00', allowed: 1890, denied: 4800 },
  { time: '20:00', allowed: 2390, denied: 3800 },
];

const alertData = [
  {
    id: 1,
    severity: 'high',
    message: 'Multiple failed login attempts detected',
    source: '10.0.0.1',
    timestamp: '2024-02-20 14:30:00',
  },
  {
    id: 2,
    severity: 'medium',
    message: 'Unusual traffic pattern detected',
    source: '10.0.0.2',
    timestamp: '2024-02-20 14:25:00',
  },
  {
    id: 3,
    severity: 'low',
    message: 'Policy violation detected',
    source: '10.0.0.3',
    timestamp: '2024-02-20 14:20:00',
  },
];

const Monitoring: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monitoring
      </Typography>

      <Grid container spacing={3}>
        {/* Traffic Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Traffic Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="allowed"
                  stroke="#4caf50"
                  activeDot={{ r: 8 }}
                />
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

        {/* Policy Violations */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Policy Violations
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="denied" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Alerts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alertData.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Chip
                          label={alert.severity}
                          color={
                            alert.severity === 'high'
                              ? 'error'
                              : alert.severity === 'medium'
                              ? 'warning'
                              : 'info'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Monitoring; 