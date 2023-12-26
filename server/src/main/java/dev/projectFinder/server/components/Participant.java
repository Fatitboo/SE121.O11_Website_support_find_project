package dev.projectFinder.server.components;

import lombok.*;

import java.time.LocalDateTime;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Participant {
    private String userId;
    // 1. received
    // 2. block
    private String status;
    private LocalDateTime receiveTime;
    private LocalDateTime layOffTime;

}
