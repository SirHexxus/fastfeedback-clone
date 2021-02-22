import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    // console.log(req.headers);
    const { feedback } = await getUserFeedback(uid);
    // console.log(feedback);
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
};
