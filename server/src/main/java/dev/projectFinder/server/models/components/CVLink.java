package dev.projectFinder.server.models.components;

import lombok.*;
import org.bson.types.ObjectId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CVLink {
    private String filename;
    private String fileUrl;
    private String publicId;
    private Boolean isDefault;
}
