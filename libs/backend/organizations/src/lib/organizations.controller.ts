import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseBoolPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une nouvelle organisation',
    description: 'Crée une nouvelle organisation avec les informations fournies'
  })
  @ApiCreatedResponse({
    description: 'Organisation créée avec succès',
    type: Object
  })
  @ApiBadRequestResponse({ description: 'Données de saisie invalides' })
  @ApiConflictResponse({ description: 'Une organisation avec ce nom existe déjà' })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister toutes les organisations',
    description: 'Récupère la liste de toutes les organisations avec option d\'inclusion des éléments supprimés'
  })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Inclure les organisations supprimées (soft delete)'
  })
  @ApiOkResponse({
    description: 'Liste des organisations récupérée avec succès',
    type: [Object]
  })
  findAll(@Query('includeDeleted', new ParseBoolPipe({ optional: true })) includeDeleted?: boolean) {
    return this.organizationsService.findAll(includeDeleted ?? false);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer une organisation par ID',
    description: 'Récupère une organisation spécifique par son identifiant avec toutes ses relations'
  })
  @ApiParam({ name: 'id', type: String, description: 'Identifiant unique de l\'organisation' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Inclure l\'organisation même if elle est supprimée'
  })
  @ApiOkResponse({
    description: 'Organisation trouvée',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation non trouvée' })
  findOne(
    @Param('id') id: string,
    @Query('includeDeleted', new ParseBoolPipe({ optional: true })) includeDeleted?: boolean
  ) {
    return this.organizationsService.findOne(id, includeDeleted ?? false);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Mettre à jour une organisation',
    description: 'Met à jour les informations d\'une organisation existante'
  })
  @ApiParam({ name: 'id', type: String, description: 'Identifiant unique de l\'organisation' })
  @ApiOkResponse({
    description: 'Organisation mise à jour avec succès',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation non trouvée' })
  @ApiBadRequestResponse({ description: 'Données de saisie invalides' })
  @ApiConflictResponse({ description: 'Une organisation avec ce nom existe déjà' })
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Supprimer une organisation',
    description: 'Supprime une organisation (soft delete par défaut, hard delete si spécifié)'
  })
  @ApiParam({ name: 'id', type: String, description: 'Identifiant unique de l\'organisation' })
  @ApiQuery({
    name: 'softDelete',
    required: false,
    type: Boolean,
    description: 'Effectuer une suppression logique (true) ou physique (false)',
    example: true
  })
  @ApiOkResponse({
    description: 'Organisation supprimée avec succès',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation non trouvée' })
  remove(
    @Param('id') id: string,
    @Query('softDelete', new ParseBoolPipe({ optional: true })) softDelete?: boolean
  ) {
    return this.organizationsService.remove(id, softDelete ?? true);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Restaurer une organisation supprimée',
    description: 'Restaure une organisation qui avait été supprimée logiquement'
  })
  @ApiParam({ name: 'id', type: String, description: 'Identifiant unique de l\'organisation' })
  @ApiOkResponse({
    description: 'Organisation restaurée avec succès',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation non trouvée' })
  @ApiConflictResponse({ description: 'L\'organisation n\'est pas supprimée' })
  restore(@Param('id') id: string) {
    return this.organizationsService.restore(id);
  }

  @Post(':organizationId/members/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ajouter un membre à une organisation',
    description: 'Ajoute un utilisateur comme membre d\'une organisation'
  })
  @ApiParam({ name: 'organizationId', type: String, description: 'Identifiant de l\'organisation' })
  @ApiParam({ name: 'userId', type: String, description: 'Identifiant de l\'utilisateur' })
  @ApiOkResponse({
    description: 'Membre ajouté avec succès',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation ou utilisateur non trouvé' })
  addMember(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string
  ) {
    return this.organizationsService.addMember(organizationId, userId);
  }

  @Delete(':organizationId/members/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retirer un membre d\'une organisation',
    description: 'Retire un utilisateur des membres d\'une organisation'
  })
  @ApiParam({ name: 'organizationId', type: String, description: 'Identifiant de l\'organisation' })
  @ApiParam({ name: 'userId', type: String, description: 'Identifiant de l\'utilisateur' })
  @ApiOkResponse({
    description: 'Membre retiré avec succès',
    type: Object
  })
  @ApiNotFoundResponse({ description: 'Organisation non trouvée' })
  removeMember(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string
  ) {
    return this.organizationsService.removeMember(organizationId, userId);
  }
}
