package com.nemo.broilerbackend.readmodel.leaderboardView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeaderboardService {
    private final LeaderboardRepository leaderboardRepository;

    @Autowired
    public LeaderboardService(LeaderboardRepository leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
    }

    public List<LeaderboardItem> findAllLeaderboardItems() {
        return leaderboardRepository.findAll();
    }

}
