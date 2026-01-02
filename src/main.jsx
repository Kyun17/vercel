import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles';

// QueryClient 객체 생성
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 3,
      }
    }
  }
);

// mui 스타일
const theme = createTheme({
  Typography: {
    fontFamily: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"

    ].join(','),
  }
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
)
