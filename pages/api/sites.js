import { getUserSites } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    // console.log(req.headers);
    const sites = await getUserSites(uid);
    // console.log(sites);
    res.status(200).json(sites);
  } catch (error) {
    // console.log(req.headers);
    res.status(500).json({ error });
  }
};
