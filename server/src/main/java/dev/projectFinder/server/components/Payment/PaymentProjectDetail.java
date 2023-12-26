package dev.projectFinder.server.components.Payment;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentProjectDetail {
    private String vacancyId;
    private double baseMoney;
    private int maxRequired;
}
