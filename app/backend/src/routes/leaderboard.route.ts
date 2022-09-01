import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.leaderboard);
router.get('/home', leaderboardController.leaderboardHome);
router.get('/away', leaderboardController.leaderboardAway);

export default router;
