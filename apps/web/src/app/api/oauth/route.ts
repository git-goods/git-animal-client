export async function GET() {
  const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
    headers: {
      'Redirect-When-Success': process.env.NODE_ENV === 'production' ? 'HOME' : 'LOCAL',
    },
  });

  return Response.json({ url: res.url });
}
