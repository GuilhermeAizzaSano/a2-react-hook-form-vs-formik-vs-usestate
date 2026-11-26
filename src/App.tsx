import { useCallback, useRef, useState } from 'react';
import {
  Box,
  Chip,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { FormsComparison } from './components/forms-comparison/FormsComparison';

function App() {
  const [offlineMode, setOfflineMode] = useState(true);
  const offlineModeRef = useRef(offlineMode);
  offlineModeRef.current = offlineMode;
  const [submissions, setSubmissions] = useState<string[]>([]);

  const handleSuccess = useCallback((origem: string) => {
    setSubmissions((prev) => [
      `${new Date().toLocaleTimeString('pt-BR')} — ${origem} (${offlineModeRef.current ? 'Simulação' : 'API :8080'})`,
      ...prev.slice(0, 5),
    ]);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', borderTop: '4px solid #09090b', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              pb: 2,
              borderBottom: '1px solid #e4e4e7',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Consolas, monospace',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                Avaliação A2 · Tema 06 · SocialConnect
              </Typography>
              <Typography variant="h4">
                React Hook Form vs. Formik vs. useState
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Mini-laboratório comparativo de cadastro de beneficiários (<code>POST /api/v1/beneficiarios</code>)
              </Typography>
            </Box>

            <Paper elevation={0} sx={{ px: 2, py: 0.75, backgroundColor: '#ffffff' }}>
              <FormControlLabel
                sx={{ m: 0 }}
                control={
                  <Switch
                    checked={offlineMode}
                    onChange={(e) => setOfflineMode(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {offlineMode ? 'Modo Simulação (sem API)' : 'API SocialConnect (:8080)'}
                  </Typography>
                }
              />
            </Paper>
          </Stack>

          <FormsComparison offlineMode={offlineMode} onSuccess={handleSuccess} />

          {submissions.length > 0 && (
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Últimos envios realizados
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {submissions.map((item, idx) => (
                  <Chip key={idx} label={item} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
