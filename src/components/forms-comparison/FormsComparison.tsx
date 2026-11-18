import {
  Box,
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
import { BeneficiarioFormFormik } from './BeneficiarioFormFormik';
import { BeneficiarioFormRHF } from './BeneficiarioFormRHF';
import { BeneficiarioFormUseState } from './BeneficiarioFormUseState';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

export function FormsComparison({ offlineMode, onSuccess }: Props) {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Digite nos três formulários e observe o contador de re-renders: enquanto useState e Formik
          re-renderizam o componente a cada tecla digitada, o React Hook Form usa inputs não controlados
          via refs e só re-renderiza na validação/submissão.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        <BeneficiarioFormRHF offlineMode={offlineMode} onSuccess={onSuccess} />
        <BeneficiarioFormFormik offlineMode={offlineMode} onSuccess={onSuccess} />
        <BeneficiarioFormUseState offlineMode={offlineMode} onSuccess={onSuccess} />
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table size="small" aria-label="Comparativo técnico entre soluções de formulário">
          <TableHead>
            <TableRow>
              <TableCell>Critério</TableCell>
              <TableCell>React Hook Form</TableCell>
              <TableCell>Formik</TableCell>
              <TableCell>useState puro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Estratégia</TableCell>
              <TableCell>Uncontrolled (refs)</TableCell>
              <TableCell>Controlled (React state)</TableCell>
              <TableCell>Controlled (manual)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Re-renders ao digitar</TableCell>
              <TableCell>Mínimos (isolados)</TableCell>
              <TableCell>A cada tecla no form</TableCell>
              <TableCell>A cada tecla no form</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Validação com Zod</TableCell>
              <TableCell>Nativa via @hookform/resolvers</TableCell>
              <TableCell>Manual / foco em Yup</TableCell>
              <TableCell>Totalmente manual</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipagem TypeScript</TableCell>
              <TableCell>Excelente (inferência direta)</TableCell>
              <TableCell>Boa (mais verbosa)</TableCell>
              <TableCell>Manual por campo</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
