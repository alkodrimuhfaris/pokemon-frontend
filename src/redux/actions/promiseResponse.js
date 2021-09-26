export default {
  pending: {
    success: false,
    pending: true,
    error: false,
    message: 'request pending',
  },
  rejected: {
    success: false,
    pending: false,
    error: true,
    message: 'request rejected',
  },
  success: {
    success: true,
    pending: false,
    error: false,
    message: 'request success',
  },
};
