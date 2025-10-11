import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

/**
 * AuthEntity - Entité de base pour l'authentification
 * Note: Cette classe ne correspond pas à un modèle Prisma spécifique
 * Elle sert de DTO de base pour les opérations d'authentification
 */
export class AuthEntity {
    @ApiProperty({ 
        description: 'Adresse email de l\'utilisateur',
        example: 'user@example.com' 
    })
    @IsEmail()
    email!: string;

    @ApiProperty({ 
        description: 'Mot de passe de l\'utilisateur',
        minLength: 6,
        example: 'password123' 
    })
    @IsString()
    @MinLength(6)
    password!: string;

    constructor(partial: Partial<AuthEntity>) {
        Object.assign(this, partial);
    }
}
