package com.nemo.broilerbackend.readmodel.leaderboardView;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LeaderboardRepository extends JpaRepository<LeaderboardItem, UUID> {
}
