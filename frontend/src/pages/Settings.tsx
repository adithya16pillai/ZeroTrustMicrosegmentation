import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';

interface Settings {
  apiEndpoint: string;
  prometheusEndpoint: string;
  grafanaEndpoint: string;
  enableNotifications: boolean;
  enableAutoDiscovery: boolean;
  logRetentionDays: number;
  maxConcurrentScans: number;
}

const defaultSettings: Settings = {
  apiEndpoint: 'http://localhost:8000',
  prometheusEndpoint: 'http://localhost:9090',
  grafanaEndpoint: 'http://localhost:3001',
  enableNotifications: true,
  enableAutoDiscovery: true,
  logRetentionDays: 30,
  maxConcurrentScans: 5,
};

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.type === 'number'
        ? Number(event.target.value)
        : event.target.value;

    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    setShowSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              API Configuration
            </Typography>
            <TextField
              fullWidth
              label="API Endpoint"
              value={settings.apiEndpoint}
              onChange={handleChange('apiEndpoint')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Prometheus Endpoint"
              value={settings.prometheusEndpoint}
              onChange={handleChange('prometheusEndpoint')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Grafana Endpoint"
              value={settings.grafanaEndpoint}
              onChange={handleChange('grafanaEndpoint')}
              margin="normal"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableNotifications}
                  onChange={handleChange('enableNotifications')}
                />
              }
              label="Enable Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableAutoDiscovery}
                  onChange={handleChange('enableAutoDiscovery')}
                />
              }
              label="Enable Auto Discovery"
            />
            <TextField
              fullWidth
              type="number"
              label="Log Retention (days)"
              value={settings.logRetentionDays}
              onChange={handleChange('logRetentionDays')}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Max Concurrent Scans"
              value={settings.maxConcurrentScans}
              onChange={handleChange('maxConcurrentScans')}
              margin="normal"
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 