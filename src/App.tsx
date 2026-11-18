import { useState } from 'react';
import {
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
  const [offlineMode, setOfflineMode] = useState(false);
  const [submissions, setSubmissions] = useState<string[]>([]);

  const handleSuccess = (origem: string) => {
    setSubmissions((prev) => [
      `${new Date().toLocaleTimeString('pt-BR')} — Cadastro enviado via ${origem}`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <div>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              SocialConnect — Mini-Laboratório A2
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tema 6: React Hook Form vs Formik vs useState (Cadastro de Beneficiário)
            </Typography>
          </div>

          <FormControlLabel
            control={
              <Switch
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
              />
            }
            label={offlineMode ? 'Modo Simulação (sem API)' : 'API SocialConnect (:8080)'}
          />
        </Stack>

        <FormsComparison offlineMode={offlineMode} onSuccess={handleSuccess} />

        {submissions.length > 0 && (
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Últimos envios realizados:
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {submissions.map((item, idx) => (
                <Chip key={idx} label={item} size="small" color="primary" variant="outlined" />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default App;
