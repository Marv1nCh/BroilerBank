package com.nemo.broilerbackend.readmodel.leaderboardView;

import com.nemo.broilerbackend.dto.LeaderboardItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<LeaderboardItemDTO> findAll() {
        return leaderboardService.findAllLeaderboardItems();
    }

    @GetMapping(path = "/inRange")
    @ResponseBody
    public List<LeaderboardItemDTO> findAllInRange(@RequestParam LocalDate start, @RequestParam LocalDate end) {
        return leaderboardService.findAllLeaderboardItemsBetween(start, end);
    }
}
