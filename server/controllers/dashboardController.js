import Program from '../models/Program.js';
import Trainer from '../models/Trainer.js';
import Membership from '../models/Membership.js';
import TrialBooking from '../models/TrialBooking.js';
import ContactMessage from '../models/ContactMessage.js';

export const getStats = async (req, res, next) => {
  try {
    const [programsCount, trainersCount, membershipsCount, trialsCount, messagesCount] = await Promise.all([
      Program.countDocuments(),
      Trainer.countDocuments(),
      Membership.countDocuments(),
      TrialBooking.countDocuments(),
      ContactMessage.countDocuments()
    ]);
    
    const recentTrials = await TrialBooking.find().sort({ createdAt: -1 }).limit(5);
    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: {
          programs: programsCount,
          trainers: trainersCount,
          memberships: membershipsCount,
          trials: trialsCount,
          messages: messagesCount
        },
        recent: {
          trials: recentTrials,
          messages: recentMessages
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
