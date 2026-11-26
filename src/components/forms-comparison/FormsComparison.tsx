import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import { BeneficiarioFormFormik } from './BeneficiarioFormFormik';
import { BeneficiarioFormRHF } from './BeneficiarioFormRHF';
import { BeneficiarioFormUseState } from './BeneficiarioFormUseState';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

export function FormsComparison({ offlineMode, onSuccess }: Props) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <Stack spacing={3}>
      <Paper elevation={0} sx={{ p: 2, backgroundColor: '#ffffff' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: 'Consolas, monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'text.secondary',
                textTransform: 'uppercase',
                mb: 0.5,
              }}
            >
              Como testar o experimento
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>1.</strong> Digite o mesmo nome nos três formulários ·{' '}
              <strong>2.</strong> Repare no contador piscando a cada tecla no <strong>Formik</strong> e no{' '}
              <strong>useState</strong> · <strong>3.</strong> Note que o <strong>React Hook Form</strong> permanece em{' '}
              <strong>01</strong> até validar ou enviar.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RestartAlt />}
            onClick={() => setResetKey((prev) => prev + 1)}
            sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Reiniciar Contadores
          </Button>
        </Stack>
      </Paper>

      <Box
        key={resetKey}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        <BeneficiarioFormRHF offlineMode={offlineMode} onSuccess={onSuccess} />
        <BeneficiarioFormFormik offlineMode={offlineMode} onSuccess={onSuccess} />
        <BeneficiarioFormUseState offlineMode={offlineMode} onSuccess={onSuccess} />
      </Box>

      <Paper elevation={0} sx={{ overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid #e4e4e7' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Resumo Comparativo e Guia de Decisão
          </Typography>
        </Box>
        <TableContainer>
          <Table size="small" aria-label="Comparativo técnico entre soluções de formulário">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 700 }}>Critério</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#065f46' }}>React Hook Form + Zod</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#1e40af' }}>Formik</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#92400e' }}>useState Puro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Modelo de Estado</TableCell>
                <TableCell>Uncontrolled (<code>ref</code> nativa no DOM)</TableCell>
                <TableCell>Controlled (estado centralizado)</TableCell>
                <TableCell>Controlled (1 estado por campo)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Re-renders ao digitar</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#065f46' }}>Zero durante a digitação</TableCell>
                <TableCell>A cada tecla + <code>onBlur</code></TableCell>
                <TableCell>A cada tecla digitada</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Validação & Tipagem</TableCell>
                <TableCell>Schema Zod + inferência TS (<code>z.infer</code>)</TableCell>
                <TableCell>Foco em Yup / validação manual</TableCell>
                <TableCell>Manual e imperativa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Quando usar</TableCell>
                <TableCell>Cadastros de domínio (3+ campos), MUI, TypeScript</TableCell>
                <TableCell>Manutenção de bases legadas Formik + Yup</TableCell>
                <TableCell>Busca simples, filtro único ou 1–2 campos</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
