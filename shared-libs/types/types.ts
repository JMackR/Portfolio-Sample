export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	Upload: any
}

export interface AblyChannelConfig {
	__typename?: 'AblyChannelConfig'
	keyName?: Maybe<Scalars['String']>
	ttl?: Maybe<Scalars['String']>
	timestamp?: Maybe<Scalars['String']>
	capability?: Maybe<Scalars['String']>
	clientId?: Maybe<Scalars['String']>
	nonce?: Maybe<Scalars['String']>
	mac?: Maybe<Scalars['String']>
}

export interface AccountAvailability {
	__typename?: 'AccountAvailability'
	accountAvailable: Scalars['Boolean']
	phoneLoginAvailable: Scalars['Boolean']
}

export interface ActivateIabInput {
	payloadSigned: Scalars['String']
	price?: Maybe<Scalars['String']>
	signature: Scalars['String']
	itemId?: Maybe<Scalars['Int']>
	promoType?: Maybe<Scalars['String']>
}

export interface ActivateIapInput {
	transactionId: Scalars['String']
	transactionDate: Scalars['String']
	productId: Scalars['String']
	transactionReceipt: Scalars['String']
	userId?: Maybe<Scalars['Int']>
	itemId?: Maybe<Scalars['Int']>
	promoType?: Maybe<Scalars['String']>
	isUserInitiated?: Maybe<Scalars['Boolean']>
}

export interface ActiveClaim {
	__typename?: 'ActiveClaim'
	claimId?: Maybe<Scalars['ID']>
	orderId?: Maybe<Scalars['String']>
	claimType?: Maybe<Scalars['String']>
	claimState?: Maybe<Scalars['String']>
	lineItemId?: Maybe<Scalars['String']>
	claimReason?: Maybe<ClaimReason>
	description?: Maybe<Scalars['String']>
	submittedTimestamp?: Maybe<Scalars['String']>
	deniedTimestamp?: Maybe<Scalars['String']>
	responseDeadline?: Maybe<ClaimDate>
}

export interface AddressInput {
	name: Scalars['String']
	street1: Scalars['String']
	street2?: Maybe<Scalars['String']>
	city: Scalars['String']
	state: Scalars['String']
	zip: Scalars['String']
	country: Scalars['String']
	type?: Maybe<Scalars['String']>
}

export interface Alert {
	__typename?: 'Alert'
	actionPath?: Maybe<Scalars['String']>
	archived: Scalars['Boolean']
	displayAvatar?: Maybe<Scalars['String']>
	contentThumbnails: Scalars['String'][]
	dateAdded: Scalars['String']
	eventMetadata?: Maybe<Scalars['String']>
	id: Scalars['String']
	notificationText?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
	objectId: Scalars['String']
	read: Scalars['Boolean']
	seen: Scalars['Boolean']
	sender?: Maybe<User>
	type: Scalars['String']
	visualTags: VisualTag[]
}

export type AlertRow = Alert | BingAd

export interface AlertsInput {
	type: AlertType
	experimentData?: Maybe<Scalars['String']>
}

export interface AlertsResponse {
	__typename?: 'AlertsResponse'
	archivedAlertsCount: Scalars['Int']
	/** @deprecated Use `alertsWithAds`. */
	alerts: Alert[]
	alertsWithAds: AlertRow[]
}

export enum AlertType {
	Inbox = 'INBOX',
	Notifications = 'NOTIFICATIONS',
}

export enum ArchiveActionType {
	Archive = 'ARCHIVE',
	Unarchive = 'UNARCHIVE',
}

export interface ArchivedItems {
	__typename?: 'ArchivedItems'
	total?: Maybe<Scalars['Int']>
	pageMaxSize?: Maybe<Scalars['Int']>
	pageCount?: Maybe<Scalars['Int']>
	pageSize?: Maybe<Scalars['Int']>
	pageCurrent?: Maybe<Scalars['Int']>
	items?: Maybe<Listing[]>
}

export interface ArchiveInput {
	itemId: Scalars['Int']
	action: ArchiveActionType
}

export enum AttributeOptionality {
	Optional = 'Optional',
	Recommended = 'Recommended',
	Required = 'Required',
}

export enum AutoCategorizationAction {
	Suggest = 'SUGGEST',
	SuggestAndSelect = 'SUGGEST_AND_SELECT',
	Enforce = 'ENFORCE',
}

export interface AutosFieldsInput {
	vehicleYear?: Maybe<Scalars['Int']>
	vehicleMake?: Maybe<Scalars['String']>
	vehicleModel?: Maybe<Scalars['String']>
	vehicleId?: Maybe<Scalars['String']>
	vehicleMiles?: Maybe<Scalars['Int']>
	vehicleTitleStatus?: Maybe<Scalars['String']>
	vehicleColor?: Maybe<Scalars['String']>
	vehicleSellerType?: Maybe<Scalars['String']>
	vehicleOptions?: Maybe<Scalars['String'][]>
	vehicleVin?: Maybe<Scalars['String']>
}

export interface AvailableBuyerShippingDiscount {
	__typename?: 'AvailableBuyerShippingDiscount'
	buyerDiscountTypeName?: Maybe<Scalars['String']>
	buyerDiscountAmount?: Maybe<Scalars['Float']>
	expiresAt?: Maybe<Scalars['String']>
}

export interface AvailableItemPromoData {
	__typename?: 'AvailableItemPromoData'
	userContext?: Maybe<PromotionUserContext>
	itemActions?: Maybe<ItemActions>
}

export interface BackgroundImage {
	__typename?: 'BackgroundImage'
	imageSize: BackgroundImageSize
	url: Scalars['String']
	imageWidth: Scalars['Int']
	imageHeight: Scalars['Int']
}

export enum BackgroundImageSize {
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE',
}

export interface BaseAd {
	ouAdId: Scalars['String']
	adMediationId: Scalars['String']
	adExperimentId: Scalars['String']
	adRequestId: Scalars['String']
	type: Scalars['String']
	experimentDataHash?: Maybe<Scalars['String']>
}

export interface BestShipppingInput {
	listingId: Scalars['String']
	shippingOptions?: Maybe<Maybe<ShippingOptionInput>[]>
}

export type BingAd = BaseAd & {
	__typename?: 'BingAd'
	ouAdId: Scalars['String']
	adMediationId: Scalars['String']
	adExperimentId: Scalars['String']
	adRequestId: Scalars['String']
	adNetwork: Scalars['String']
	type: Scalars['String']
	experimentDataHash?: Maybe<Scalars['String']>
	searchId: Scalars['String']
	imageUrl: Scalars['String']
	contentUrl: Scalars['String']
	price: Scalars['String']
	priceCurrency: Scalars['String']
	itemName: Scalars['String']
	sellerName: Scalars['String']
	clientImpressionFeedbackUrls?: Maybe<Scalars['String'][]>
	clickReturnUrl: Scalars['String']
	lowPrice?: Maybe<Scalars['Float']>
	impressionFeedbackUrl: Scalars['String']
	clickFeedbackUrl: Scalars['String']
	imageWidth: Scalars['Int']
	imageHeight: Scalars['Int']
	rating: Scalars['Float']
	numberOfReviews: Scalars['Int']
}

export interface BlockedInfo {
	__typename?: 'BlockedInfo'
	reportToken?: Maybe<Scalars['String']>
	blockDate?: Maybe<Scalars['String']>
	blockedUser?: Maybe<Scalars['Int']>
	reportId?: Maybe<Scalars['String']>
}

export interface BoardSummary {
	__typename?: 'BoardSummary'
	id: Scalars['String']
	name: Scalars['String']
	description: Scalars['String']
	isPublic: Scalars['Boolean']
	itemCount?: Maybe<Scalars['Int']>
	isQuickSave: Scalars['Boolean']
}

export interface BuyerAddress {
	__typename?: 'BuyerAddress'
	name: Scalars['String']
	street1: Scalars['String']
	street2?: Maybe<Scalars['String']>
	city: Scalars['String']
	state: Scalars['String']
	zip: Scalars['String']
	country: Scalars['String']
	type?: Maybe<Scalars['String']>
}

export interface BuyerDetails {
	__typename?: 'BuyerDetails'
	userId: Scalars['String']
	address?: Maybe<BuyerAddress>
}

export interface BuyerOrderDetails {
	__typename?: 'BuyerOrderDetails'
	orderSubTotal?: Maybe<Fee>
	orderTotal?: Maybe<Fee>
	fees?: Maybe<Maybe<Fee>[]>
}

export interface BuyerProfile {
	__typename?: 'BuyerProfile'
	/** @deprecated Use `phoneNumber`. */
	phone_number?: Maybe<Scalars['String']>
	phoneNumber?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	name?: Maybe<Scalars['String']>
}

export interface BuyerProfileInput {
	phoneNumber?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	name?: Maybe<Scalars['String']>
}

export interface BuyerRequestReturnInput {
	returnId: Scalars['String']
	reason?: Maybe<Scalars['String']>
	reasonDescription?: Maybe<Scalars['String']>
}

export interface C2CPhoneNumber {
	__typename?: 'C2CPhoneNumber'
	nationalNumber?: Maybe<Scalars['String']>
	countryCode?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
	Public = 'PUBLIC',
	Private = 'PRIVATE',
}

export interface Cancellation {
	__typename?: 'Cancellation'
	reason?: Maybe<Scalars['String']>
	notes?: Maybe<Scalars['String']>
}

export interface CardVerificationInput {
	payment_method_id?: Maybe<Scalars['Int']>
	paymentMethodId?: Maybe<Scalars['Int']>
	cardverify_payload?: Maybe<Scalars['String']>
	cardVerifyPayload?: Maybe<Scalars['String']>
}

export interface CategoriesData {
	__typename?: 'CategoriesData'
	total: Scalars['Int']
	categories: Category[]
}

export interface Category {
	__typename?: 'Category'
	id: Scalars['ID']
	/** @deprecated not returned by new endpoint */
	name?: Maybe<Scalars['String']>
	level?: Maybe<Scalars['Int']>
	levelOneName?: Maybe<Scalars['String']>
	levelTwoName?: Maybe<Scalars['String']>
	levelThreeName?: Maybe<Scalars['String']>
	categoryAttributes?: Maybe<Maybe<CategoryAttribute>[]>
}

export interface CategoryAttribute {
	__typename?: 'CategoryAttribute'
	attributeName: Scalars['String']
	uiAttributeName: Scalars['String']
	merchantRequirement?: Maybe<AttributeOptionality>
	consumerRequirement: AttributeOptionality
	priority: Scalars['Int']
	values?: Maybe<Scalars['String'][]>
	allowMultipleValues: Scalars['Boolean']
	allowOther: Scalars['Boolean']
	selectionMode: SelectionMode
}

export interface CategoryAttributeMap {
	__typename?: 'CategoryAttributeMap'
	attributePriority: Scalars['Int']
	attributeUILabel: Scalars['String']
	attributeName: Scalars['String']
	attributeValue: Scalars['String'][]
}

export interface CategoryAttributes {
	__typename?: 'CategoryAttributes'
	categoryInformation: CategoryNode
	attributes: CategoryAttribute[]
}

export interface CategoryNode {
	__typename?: 'CategoryNode'
	id: Scalars['ID']
	currentLevelId: Scalars['ID']
	level: Scalars['Int']
	label: Scalars['String']
	parents?: Maybe<Maybe<Scalars['String']>[]>
	children?: Maybe<Maybe<CategoryNode>[]>
	order: Scalars['Int']
}

export interface CategoryTaxonomy {
	__typename?: 'CategoryTaxonomy'
	active: Scalars['Boolean']
	children: CategoryNode[]
}

export interface ChangeEmailInput {
	userId: Scalars['ID']
	email: Scalars['String']
	multifactorHeaderInfo?: Maybe<MultifactorHeaderInfo>
}

export interface ChangePasswordInput {
	newPassword: Scalars['String']
	oldPassword: Scalars['String']
	userId: Scalars['ID']
}

export interface ChartDataSegment {
	__typename?: 'ChartDataSegment'
	timestamp: Scalars['String']
	value: Scalars['Int']
}

export interface ChartDataStream {
	__typename?: 'ChartDataStream'
	totalCountInRange: Scalars['Int']
	legendName: Scalars['String']
	color: Scalars['String']
	segments?: Maybe<Maybe<Maybe<ChartDataSegment>[]>[]>
}

export interface Claim {
	__typename?: 'Claim'
	claimReasons?: Maybe<Maybe<ClaimReason>[]>
	buyerDetails?: Maybe<ClaimBuyerDetails>
	claimEligibility?: Maybe<ClaimEligibility>
	activeClaim?: Maybe<ActiveClaim>
}

export interface ClaimBuyerDetails {
	__typename?: 'ClaimBuyerDetails'
	userId: Scalars['String']
	email: Scalars['String']
	profileImageUrl?: Maybe<Scalars['String']>
}

export interface ClaimDate {
	__typename?: 'ClaimDate'
	date: Scalars['String']
	businessDays: Scalars['String']
}

export interface ClaimEligibility {
	__typename?: 'ClaimEligibility'
	state: ClaimEligibilityState
	nextEligibleClaimType: ClaimEligibilityType
	timeTillNextClaimEligibility?: Maybe<ClaimDate>
	claimSubmissionDeadline?: Maybe<ClaimDate>
}

export interface ClaimEligibilityInput {
	orderId: Scalars['String']
	lineItemId: Scalars['String']
}

export enum ClaimEligibilityState {
	CanSubmitSelfRes = 'CAN_SUBMIT_SELF_RES',
	InProgress = 'IN_PROGRESS',
	WindowExpired = 'WINDOW_EXPIRED',
	CanSubmitBpc = 'CAN_SUBMIT_BPC',
	BpcInProgress = 'BPC_IN_PROGRESS',
	BpcDenied = 'BPC_DENIED',
	Unknown = 'UNKNOWN',
}

export enum ClaimEligibilityType {
	B2CSelfResolution = 'B2C_SELF_RESOLUTION',
	B2CBuyerProtection = 'B2C_BUYER_PROTECTION',
	Unknown = 'UNKNOWN',
}

export interface ClaimReason {
	__typename?: 'ClaimReason'
	key: Scalars['String']
	displayText: Scalars['String']
}

export interface ConfirmationInterstitial {
	__typename?: 'ConfirmationInterstitial'
	title?: Maybe<Scalars['String']>
	buttonText?: Maybe<Scalars['String']>
	description?: Maybe<Maybe<Scalars['String']>[]>
}

export interface ConfirmOrderInput {
	orderId: Scalars['String']
	nonce?: Maybe<Scalars['String']>
}

export interface ConnectFacebookAccountInput {
	accessToken: Scalars['String']
}

export enum ConnectionType {
	Followings = 'Followings',
	Followers = 'Followers',
}

export interface CreateClaimInput {
	orderId: Scalars['String']
	lineItemId: Scalars['String']
	claimReasonKey: Scalars['String']
	description: Scalars['String']
	claimType: Scalars['String']
}

export interface CreateOrderInput {
	buyerId: Scalars['String']
	listingId: Scalars['String']
	shippingPriority: Scalars['String']
}

export interface CreateSavedListInput {
	name: Scalars['String']
}

export interface CreateShippingTransactionInput {
	itemId: Scalars['Int']
	buyerId: Scalars['Int']
	offerPrice?: Maybe<Scalars['String']>
}

export interface CreateUserInput {
	name: Scalars['String']
	email: Scalars['String']
	password: Scalars['String']
	clientType?: Maybe<Scalars['String']>
}

export interface CreditCard {
	__typename?: 'CreditCard'
	/** @deprecated Use `cardType`. */
	card_type?: Maybe<Scalars['String']>
	/** @deprecated Use `displayName`. */
	display_name?: Maybe<Scalars['String']>
	/** @deprecated Use `expirationYear`. */
	expiration_year?: Maybe<Scalars['String']>
	/** @deprecated Use `expirationMonth`. */
	expiration_month?: Maybe<Scalars['String']>
	/** @deprecated Use `lastFour`. */
	last_four?: Maybe<Scalars['String']>
	cardType?: Maybe<Scalars['String']>
	displayName?: Maybe<Scalars['String']>
	expirationYear?: Maybe<Scalars['String']>
	expirationMonth?: Maybe<Scalars['String']>
	lastFour?: Maybe<Scalars['String']>
	hash?: Maybe<Scalars['String']>
	expired?: Maybe<Scalars['Boolean']>
}

export interface DepositInfoNeededResponse {
	__typename?: 'DepositInfoNeededResponse'
	/** @deprecated Use `actionPath`. */
	action_path?: Maybe<Scalars['String']>
	actionPath?: Maybe<Scalars['String']>
}

export interface DepositMethod {
	__typename?: 'DepositMethod'
	uuid?: Maybe<Scalars['String']>
	type?: Maybe<Scalars['String']>
	default?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `lastFour`. */
	last_four?: Maybe<Scalars['String']>
	/** @deprecated Use `supportsInstantPayouts`. */
	supports_instant_payouts?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `displayName`. */
	display_name: Scalars['String']
	/** @deprecated Use `errorMessage`. */
	error_message?: Maybe<Scalars['String']>
	lastFour?: Maybe<Scalars['String']>
	supportsInstantPayouts?: Maybe<Scalars['Boolean']>
	displayName: Scalars['String']
	errorMessage?: Maybe<Scalars['String']>
}

export interface DepositMethodUserData {
	__typename?: 'DepositMethodUserData'
	/** @deprecated Use `paymentUserData`. */
	payment_user_data?: Maybe<PaymentUserData>
	/** @deprecated Use `depositMethod`. */
	deposit_method?: Maybe<DepositMethod>
	paymentUserData?: Maybe<PaymentUserData>
	depositMethod?: Maybe<DepositMethod>
}

export interface Discussion {
	__typename?: 'Discussion'
	id: Scalars['String']
	/** @deprecated Use `sellerId`. */
	seller_id: Scalars['Int']
	/** @deprecated Use `buyerId`. */
	buyer_id: Scalars['Int']
	/** @deprecated Use `itemId`. */
	item_id: Scalars['Int']
	/** @deprecated Use `dateCreated`. */
	date_created: Scalars['String']
	sellerId: Scalars['Int']
	buyerId: Scalars['Int']
	itemId: Scalars['Int']
	dateCreated: Scalars['String']
	readStatus: DiscussionReadStatus[]
	lastPostDate: Scalars['String']
	messages: Message[]
	visualTags: VisualTag[]
}

export interface DiscussionNotification {
	__typename?: 'DiscussionNotification'
	id: Scalars['Int']
	discussionId: Scalars['String']
	text: Scalars['String']
}

export interface DiscussionReadStatus {
	__typename?: 'DiscussionReadStatus'
	userId?: Maybe<Scalars['ID']>
	lastReadDate: Scalars['String']
}

export interface DiscussionsInput {
	discussionId: Scalars['String']
	before?: Maybe<Scalars['String']>
}

export interface EmailChallengeMetadataInput {
	type: Scalars['String']
	countryCode: Scalars['String']
	phoneNumber: Scalars['String']
}

export interface EmailInput {
	email: Scalars['String']
}

export interface EstimatedDelivery {
	__typename?: 'EstimatedDelivery'
	minDeliveryTimestamp?: Maybe<Scalars['String']>
	maxDeliveryTimestamp?: Maybe<Scalars['String']>
}

export interface FeatureAttributes {
	__typename?: 'FeatureAttributes'
	canReceiveInteractionRatings?: Maybe<Scalars['Boolean']>
	clickToCallEnabled?: Maybe<Scalars['Boolean']>
	showMoreItemsFromUserInItemDetails?: Maybe<Scalars['Boolean']>
	canSendPhotosInChat?: Maybe<Scalars['Boolean']>
}

export interface FederatedLoginInfo {
	__typename?: 'FederatedLoginInfo'
	scope?: Maybe<Maybe<Scalars['String']>[]>
	state: Scalars['String']
	redirectUri: Scalars['String']
	clientId: Scalars['String']
}

export interface FederatedLoginInfoInput {
	clientType: Scalars['String']
	provider: Scalars['String']
}

export interface FederatedLoginInput {
	redirectUri: Scalars['String']
	state: Scalars['String']
	accessToken?: Maybe<Scalars['String']>
	code?: Maybe<Scalars['String']>
	user?: Maybe<Scalars['String']>
}

export interface Fee {
	__typename?: 'Fee'
	name?: Maybe<Scalars['String']>
	value?: Maybe<Scalars['String']>
	currency?: Maybe<Scalars['String']>
	type?: Maybe<Scalars['String']>
}

export interface FeedBanner {
	__typename?: 'FeedBanner'
	label?: Maybe<Scalars['String']>
	actionBannerType?: Maybe<Scalars['String']>
}

export interface FeedItem {
	__typename?: 'FeedItem'
	type?: Maybe<Scalars['String']>
	/** @deprecated Use `tileId`. */
	tile_id?: Maybe<Scalars['String']>
	tileId?: Maybe<Scalars['String']>
	/** @deprecated Does not support ads. Use `tile`. */
	listing?: Maybe<Listing>
	tile?: Maybe<FeedTile>
	banner?: Maybe<FeedBanner>
}

export interface FeedOptionListSelection {
	__typename?: 'FeedOptionListSelection'
	position: Scalars['String']
	type: Scalars['String']
	name: Scalars['String']
	label: Scalars['String']
	/** @deprecated Use `labelShort`. */
	label_short: Scalars['String']
	labelShort: Scalars['String']
	/** @deprecated Use `queryParam`. */
	query_param: Scalars['String']
	queryParam: Scalars['String']
	options: FeedOptionListSelectionOption[]
}

export interface FeedOptionListSelectionOption {
	__typename?: 'FeedOptionListSelectionOption'
	label: Scalars['String']
	labelShort?: Maybe<Scalars['String']>
	/** @deprecated Use `labelShort`. */
	label_short?: Maybe<Scalars['String']>
	subLabel?: Maybe<Scalars['String']>
	value: Scalars['String']
	selected: Scalars['Boolean']
	default: Scalars['Boolean']
}

export interface FeedOptionNumericRange {
	__typename?: 'FeedOptionNumericRange'
	position: Scalars['String']
	type: Scalars['String']
	name: Scalars['String']
	label: Scalars['String']
	labelShort: Scalars['String']
	/** @deprecated Use `labelShort`. */
	label_short: Scalars['String']
	units: Scalars['String']
	lowerBound?: Maybe<Scalars['Int']>
	upperBound?: Maybe<Scalars['Int']>
	leftQueryParam: Scalars['String']
	rightQueryParam: Scalars['String']
	options: FeedOptionNumericRangeOption[]
}

export interface FeedOptionNumericRangeOption {
	__typename?: 'FeedOptionNumericRangeOption'
	label: Scalars['String']
	currentValue?: Maybe<Scalars['String']>
	textHint?: Maybe<Scalars['String']>
}

export type FeedOptions = FeedOptionListSelection | FeedOptionNumericRange

export interface FeedPresentation {
	__typename?: 'FeedPresentation'
	columnCount: Scalars['Int']
	showDetailsOnTiles: Scalars['Boolean']
}

export type FeedTile = Listing | BingAd | SellerAd

export interface FetchShippingTransactionInput {
	itemId: Scalars['Int']
	buyerId: Scalars['Int']
}

export interface Following {
	__typename?: 'Following'
	following: Scalars['Boolean']
}

export interface FollowingUser {
	__typename?: 'FollowingUser'
	squareAvatarURL?: Maybe<Scalars['String']>
	publicLocationName?: Maybe<Scalars['String']>
	following?: Maybe<Scalars['Int']>
	name?: Maybe<Scalars['String']>
	userId?: Maybe<Scalars['Int']>
}

export interface Fulfillment {
	__typename?: 'Fulfillment'
	trackingDetails?: Maybe<TrackingDetails>
}

export interface FullfilmentDetails {
	__typename?: 'FullfilmentDetails'
	/** @deprecated Use `localPickupEnabled`. */
	local_pickup_enabled: Scalars['Boolean']
	/** @deprecated Use `buyItNowEnabled`. */
	buy_it_now_enabled: Scalars['Boolean']
	/** @deprecated Use `sellerPaysShipping`. */
	seller_pays_shipping: Scalars['Boolean']
	/** @deprecated Use `showAsShipped`. */
	show_as_shipped: Scalars['Boolean']
	/** @deprecated Use `canShipToBuyer`. */
	can_ship_to_buyer: Scalars['Boolean']
	/** @deprecated Use `estimatedDeliveryDateEnd`. */
	estimated_delivery_date_end: Scalars['String']
	/** @deprecated Use `sellerManagesShipping`. */
	seller_manages_shipping: Scalars['Boolean']
	/** @deprecated Use `shippingEnabled`. */
	shipping_enabled: Scalars['Boolean']
	/** @deprecated Use `shippingParcelId`. */
	shipping_parcel_id?: Maybe<Scalars['String']>
	/** @deprecated Use `shippingPrice`. */
	shipping_price: Scalars['Float']
	localPickupEnabled: Scalars['Boolean']
	buyItNowEnabled: Scalars['Boolean']
	sellerPaysShipping: Scalars['Boolean']
	showAsShipped: Scalars['Boolean']
	canShipToBuyer: Scalars['Boolean']
	estimatedDeliveryDateStart?: Maybe<Scalars['String']>
	estimatedDeliveryDateEnd?: Maybe<Scalars['String']>
	sellerManagesShipping: Scalars['Boolean']
	shippingEnabled: Scalars['Boolean']
	shippingParcelId?: Maybe<Scalars['String']>
	shippingPrice?: Maybe<Scalars['Float']>
	showShippingIconInFeed: Scalars['Boolean']
}

export interface GenericAttribute {
	__typename?: 'GenericAttribute'
	attributeType?: Maybe<Scalars['String']>
	options: Maybe<Scalars['String']>[]
	properties: Maybe<Property>[]
}

export interface GetAvailablePromosInput {
	itemId: Scalars['Int']
	sellFasterSimplificationVariant?: Maybe<Scalars['String']>
	isMISEnabled?: Maybe<Scalars['Boolean']>
}

export interface GetReportReasonInput {
	type: ReportReasonType
	parentId?: Maybe<Scalars['ID']>
}

export interface IapSubscription {
	__typename?: 'IAPSubscription'
	promoType?: Maybe<Scalars['String']>
	promoGroup?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	buttonText?: Maybe<Scalars['String']>
	preselected?: Maybe<Scalars['Boolean']>
	subtitleToDisplay?: Maybe<Scalars['String']>
	decoratorToDisplay?: Maybe<Scalars['String']>
	freeTrialPriceToDisplay?: Maybe<Scalars['String']>
	freeTrialAvailable?: Maybe<Scalars['Boolean']>
	isPurchased?: Maybe<Scalars['Boolean']>
	switchOption?: Maybe<Scalars['String']>
	paymentDataIos?: Maybe<PromotionPaymentData>
	paymentDataAndroid?: Maybe<PromotionPaymentData>
	confirmationMessage?: Maybe<Scalars['String']>
	iconUrl?: Maybe<Scalars['String']>
	help?: Maybe<Scalars['String']>
	paymentDataWeb?: Maybe<PromotionPaymentData>
	confirmationInterstitial?: Maybe<ConfirmationInterstitial>
}

export interface IdentityAttributes {
	__typename?: 'IdentityAttributes'
	/** @deprecated Use `isTruyouMember`. */
	is_truyou_member: Scalars['Boolean']
	isTruyouMember: Scalars['Boolean']
	/** @deprecated Use `isAutosDealer`. */
	is_autos_dealer: Scalars['Boolean']
	isAutosDealer: Scalars['Boolean']
	/** @deprecated Use `isAutosDealerPaymentInfoOnFile`. */
	is_autos_dealer_payment_info_on_file: Scalars['Boolean']
	isAutosDealerPaymentInfoOnFile: Scalars['Boolean']
	/** @deprecated Use `isSmallBusiness`. */
	is_small_business: Scalars['Boolean']
	isSmallBusiness: Scalars['Boolean']
	/** @deprecated Use `isPotentialAutosSeller`. */
	is_potential_autos_seller: Scalars['Boolean']
	isPotentialAutosSeller: Scalars['Boolean']
	/** @deprecated Use `isPaymentsEnabled`. */
	is_payments_enabled: Scalars['Boolean']
	isPaymentsEnabled: Scalars['Boolean']
	/** @deprecated Use `isTermsAccepted`. */
	is_terms_accepted: Scalars['Boolean']
	isTermsAccepted: Scalars['Boolean']
}

export interface Image {
	__typename?: 'Image'
	url: Scalars['String']
	uuid?: Maybe<Scalars['String']>
	width: Scalars['Int']
	height: Scalars['Int']
}

export interface IncentivizedLinkInfo {
	__typename?: 'IncentivizedLinkInfo'
	link: Scalars['String']
	displayTitle: Scalars['String']
	displayText: Scalars['String']
	shareText: Scalars['String']
}

export interface IncentivizedLinkInput {
	promotionId: Scalars['String']
}

export interface InventoryPromo {
	__typename?: 'InventoryPromo'
	promoType?: Maybe<Scalars['String']>
	inventoryPromoId?: Maybe<Scalars['String']>
	currentItemId?: Maybe<Scalars['Int']>
	currentItemTitle?: Maybe<Scalars['String']>
	currentItemImageURL?: Maybe<Scalars['String']>
	currentItemViewCount?: Maybe<Scalars['Int']>
	currentItemCategoryId?: Maybe<Scalars['Int']>
}

export interface ItemActions {
	__typename?: 'ItemActions'
	allowRating?: Maybe<Scalars['Boolean']>
	itemId?: Maybe<Scalars['String']>
	heroTitleText?: Maybe<Scalars['String']>
	promos?: Maybe<Maybe<ItemPromo>[]>
	promoHierarchy?: Maybe<Maybe<ItemPromoGroup>[]>
	inventoryPromos?: Maybe<Maybe<InventoryPromo>[]>
}

export interface ItemCategorization {
	__typename?: 'ItemCategorization'
	categoryId: Scalars['ID']
	action: AutoCategorizationAction
	categoryAttributeMap: CategoryAttributeMap[]
}

export interface ItemIdInput {
	itemId: Scalars['ID']
}

export interface ItemList {
	__typename?: 'ItemList'
	sort?: Maybe<Scalars['Int']>
	/** @deprecated Use `locationName`. */
	user_required?: Maybe<Scalars['Int']>
	userRequired?: Maybe<Scalars['Int']>
	description?: Maybe<Scalars['String']>
	/** @deprecated Use `imageMediumHeight`. */
	image_medium_height?: Maybe<Scalars['Int']>
	/** @deprecated Use `imageMediumUrl`. */
	image_medium_url?: Maybe<Scalars['String']>
	/** @deprecated Use `imageSquareUrl`. */
	image_square_url?: Maybe<Scalars['String']>
	/** @deprecated Use `imageMediumWidth`. */
	image_medium_width?: Maybe<Scalars['Int']>
	imageMediumHeight?: Maybe<Scalars['Int']>
	imageMediumUrl?: Maybe<Scalars['String']>
	imageSquareUrl?: Maybe<Scalars['String']>
	imageMediumWidth?: Maybe<Scalars['Int']>
	query?: Maybe<Scalars['String']>
	id?: Maybe<Scalars['Int']>
	name?: Maybe<Scalars['String']>
}

export interface ItemListsData {
	__typename?: 'ItemListsData'
	total: Scalars['Int']
	/** @deprecated Use `itemLists`. */
	item_lists: ItemList[]
	itemLists: ItemList[]
}

export interface ItemPerformanceInfo {
	__typename?: 'ItemPerformanceInfo'
	chartData: ChartDataStream[]
	performanceMetaData: PerformanceMetaData
	purchasedPromos?: Maybe<PurchasedItemPromos>
}

export interface ItemPerformancePromoData {
	__typename?: 'ItemPerformancePromoData'
	sellerAd?: Maybe<ItemPerformancePromoInfo>
}

export interface ItemPerformancePromoInfo {
	__typename?: 'ItemPerformancePromoInfo'
	organicImpressions?: Maybe<Scalars['String']>
	promotedImpressions?: Maybe<Scalars['String']>
	stackedExpirationTime?: Maybe<Scalars['String']>
	noEndDate?: Maybe<Scalars['Boolean']>
	labelname?: Maybe<Scalars['String']>
}

export interface ItemPromo {
	__typename?: 'ItemPromo'
	promoType?: Maybe<Scalars['String']>
	promoGroup?: Maybe<Scalars['String']>
	available?: Maybe<Scalars['Boolean']>
	description?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
	confirmationMessage?: Maybe<Scalars['String']>
	iconUrl?: Maybe<Scalars['String']>
	subtitleToDisplay?: Maybe<Scalars['String']>
	featureList?: Maybe<Maybe<PromotionFeature>[]>
	paymentDataIos?: Maybe<PromotionPaymentData>
	paymentDataAndroid?: Maybe<PromotionPaymentData>
	decoratorToDisplay?: Maybe<Scalars['String']>
	preselected?: Maybe<Scalars['Boolean']>
}

export interface ItemPromoGroup {
	__typename?: 'ItemPromoGroup'
	title?: Maybe<Scalars['String']>
	help?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	subtitleToDisplay?: Maybe<Scalars['String']>
	buttonTextToDisplay?: Maybe<Scalars['String']>
	preselected?: Maybe<Scalars['Boolean']>
	decoratorToDisplay?: Maybe<Scalars['String']>
	purchasedDescriptionToDisplay?: Maybe<Scalars['String']>
	freeTrialAvailable?: Maybe<Scalars['Boolean']>
	featureList?: Maybe<Maybe<PromotionFeature>[]>
	specials?: Maybe<Maybe<PromotionSpecials>[]>
	promoTypes?: Maybe<Maybe<Scalars['String']>[]>
}

export interface ItemSavedStatus {
	__typename?: 'ItemSavedStatus'
	savedList: SavedList
	itemSaved: Scalars['Boolean']
}

export interface ItemViewedEventHeader {
	appVersion: Scalars['String']
	deviceId: Scalars['String']
	origin: Scalars['String']
	timestamp: Scalars['String']
	uniqueId: Scalars['String']
	userId?: Maybe<Scalars['String']>
}

export interface ItemViewedEventInput {
	itemId: Scalars['ID']
	sellerId: Scalars['ID']
	header: ItemViewedEventHeader
	mobileHeader: ItemViewedEventMobileHeader
	origin?: Maybe<Scalars['String']>
	source?: Maybe<Scalars['String']>
	tileType?: Maybe<Scalars['String']>
	userId?: Maybe<Scalars['String']>
}

export interface ItemViewedEventMobileHeader {
	localTimestamp: Scalars['String']
}

export interface JwtTokenRefreshInput {
	jwtToken: Scalars['String']
	refreshToken: Scalars['String']
	requestShortExpiration?: Maybe<Scalars['Boolean']>
}

export interface JwtTokenRefreshResponse {
	__typename?: 'JwtTokenRefreshResponse'
	jwtToken: Scalars['String']
	refreshToken: Scalars['String']
	tokenType: Scalars['String']
}

export interface Listing {
	__typename?: 'Listing'
	id?: Maybe<Scalars['ID']>
	listingId?: Maybe<Scalars['ID']>
	title: Scalars['String']
	price: Scalars['String']
	originalPrice?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	condition: Scalars['Int']
	state: ListingState
	category?: Maybe<Category>
	/** @deprecated Use `postDate`. */
	post_date: Scalars['String']
	postDate: Scalars['String']
	viewCount?: Maybe<Scalars['Int']>
	discussionCount?: Maybe<Scalars['Int']>
	discussionVisualTags?: Maybe<VisualTag[]>
	owner?: Maybe<User>
	merchantProfile?: Maybe<MerchantProfile>
	photos: Photo[]
	/** @deprecated Use `fulfillmentDetails`. */
	fulfillment_details: FullfilmentDetails
	/** @deprecated Use `locationDetails`. */
	location_details: LocationDetails
	fulfillmentDetails?: Maybe<FullfilmentDetails>
	locationDetails: LocationDetails
	/** @deprecated Use `discussionCount`. */
	discussionUsers?: Maybe<User[]>
	/** @deprecated Use `genericAttributes`. */
	generic_attributes: Scalars['String'][]
	/** @deprecated not returned by new endpoint */
	genericAttributes?: Maybe<Maybe<GenericAttribute>[]>
	itemActions?: Maybe<ItemActions>
	purchasedItemPromos?: Maybe<PurchasedItemPromos>
	saved?: Maybe<Scalars['Boolean']>
	vehicleAttributes?: Maybe<VehicleAttributes>
	sortLabel?: Maybe<Scalars['String']>
	payable?: Maybe<Scalars['Boolean']>
	/** @deprecated Use isFirmOnPrice */
	listingType?: Maybe<Scalars['Int']>
	isFirmOnPrice: Scalars['Boolean']
	bestOffer?: Maybe<Scalars['String']>
	watched?: Maybe<Scalars['Boolean']>
	quantity: Scalars['Int']
	type: Scalars['String']
	ownerId: Scalars['ID']
	merchantId?: Maybe<Scalars['ID']>
	modified?: Maybe<Scalars['String']>
	lastChangedBy?: Maybe<Scalars['String']>
	createdBy?: Maybe<Scalars['ID']>
	conditionText: ListingCondition
	sku?: Maybe<Scalars['String']>
	categoryAttributeMap: CategoryAttributeMap[]
	shippingOptions?: Maybe<Maybe<ShippingOption>[]>
}

export interface ListingCategoryAttribute {
	attributeName: Scalars['String']
	attributeValue: Scalars['String'][]
}

export enum ListingCondition {
	New = 'NEW',
	Refurbished = 'REFURBISHED',
	OpenBox = 'OPEN_BOX',
	Used = 'USED',
	Broken = 'BROKEN',
	Other = 'OTHER',
}

export interface ListingDashboardData {
	__typename?: 'ListingDashboardData'
	hideSelleradsPurchaseOnWeb?: Maybe<Scalars['Boolean']>
	hasPromotedListings?: Maybe<Scalars['Boolean']>
	userContext?: Maybe<PromotionUserContext>
	listing?: Maybe<Listing>
}

export interface ListingDashboardInput {
	sellFasterSimplificationVariant?: Maybe<Scalars['String']>
	isMISEnabled?: Maybe<Scalars['Boolean']>
	operationContext?: Maybe<Scalars['String']>
}

export interface ListingData {
	__typename?: 'ListingData'
	item?: Maybe<Listing>
}

export interface ListingImage {
	uuid: Scalars['ID']
	width: Scalars['Float']
	height: Scalars['Float']
}

export interface ListingInput {
	title: Scalars['String']
	condition: Scalars['Int']
	categoryId: Scalars['Int']
	description?: Maybe<Scalars['String']>
	price: Scalars['Float']
	listingType?: Maybe<Scalars['Int']>
	photoIds: Scalars['String'][]
	latitude?: Maybe<Scalars['Float']>
	longitude?: Maybe<Scalars['Float']>
	zipcode?: Maybe<Scalars['String']>
	shippingEnabled?: Maybe<Scalars['Boolean']>
	buyItNowEnabled?: Maybe<Scalars['Boolean']>
	shippingParcelId?: Maybe<Scalars['String']>
	localPickupEnabled?: Maybe<Scalars['Boolean']>
	autosFields?: Maybe<AutosFieldsInput>
}

export interface ListingInputV2 {
	postSessionId: Scalars['ID']
	listingId?: Maybe<Scalars['ID']>
	title: Scalars['String']
	description?: Maybe<Scalars['String']>
	price: Scalars['String']
	isFirmPrice?: Maybe<Scalars['Boolean']>
	condition: ListingCondition
	categoryId: Scalars['ID']
	categoryAttributes: ListingCategoryAttribute[]
	coverImageSquare: ListingImage
	coverImageFullSize: ListingImage
	additionalImages: ListingImage[]
	latitude?: Maybe<Scalars['Float']>
	longitude?: Maybe<Scalars['Float']>
	zipcode?: Maybe<Scalars['String']>
	shippingEnabled: Scalars['Boolean']
	shippingParcelId?: Maybe<Scalars['String']>
	buyItNowEnabled: Scalars['Boolean']
	localPickupEnabled: Scalars['Boolean']
	purchaseOptionType?: Maybe<Scalars['Int']>
}

export interface ListingResponse {
	__typename?: 'ListingResponse'
	data?: Maybe<ListingData>
}

export enum ListingState {
	Incomplete = 'INCOMPLETE',
	Unlisted = 'UNLISTED',
	Listed = 'LISTED',
	Pending = 'PENDING',
	Sold = 'SOLD',
	Removed = 'REMOVED',
	Deleted = 'DELETED',
	Unknown = 'UNKNOWN',
}

export interface LocationDetails {
	__typename?: 'LocationDetails'
	/** @deprecated Use `locationName`. */
	location_name?: Maybe<Scalars['String']>
	locationName?: Maybe<Scalars['String']>
	longitude?: Maybe<Scalars['String']>
	latitude?: Maybe<Scalars['String']>
	distance?: Maybe<Scalars['Int']>
	city?: Maybe<Scalars['String']>
	state?: Maybe<Scalars['String']>
	zipcode?: Maybe<Scalars['String']>
}

export interface LocationInput {
	lat?: Maybe<Scalars['String']>
	lon?: Maybe<Scalars['String']>
}

export interface LoginUserInput {
	email: Scalars['String']
	password: Scalars['String']
}

export interface MakeOfferInput {
	offerPrice: Scalars['Float']
	itemId: Scalars['String']
}

export interface MarkShippedPromptData {
	__typename?: 'MarkShippedPromptData'
	promptTitle?: Maybe<Scalars['String']>
	promptBody?: Maybe<Scalars['String']>
	promptCancelButtonTitle?: Maybe<Scalars['String']>
	promptAcceptButtonTitle?: Maybe<Scalars['String']>
}

export interface MeetupSpot {
	__typename?: 'MeetupSpot'
	spotId: Scalars['String']
	spotType?: Maybe<Scalars['String']>
	name?: Maybe<Scalars['String']>
	address?: Maybe<Scalars['String']>
	placeId: Scalars['String']
	placeType?: Maybe<Scalars['String']>
	distanceMiles?: Maybe<Scalars['Float']>
	longitude?: Maybe<Scalars['String']>
	latitude?: Maybe<Scalars['String']>
}

export interface MeetupStatus {
	__typename?: 'MeetupStatus'
	id: Scalars['String']
	buyerId: Scalars['String']
	itemId: Scalars['String']
	status: Scalars['String']
	stateHash: Scalars['String']
}

export interface MerchantBusiness {
	__typename?: 'MerchantBusiness'
	type?: Maybe<Scalars['String']>
	firstName?: Maybe<Scalars['String']>
	lastName?: Maybe<Scalars['String']>
	aliasName?: Maybe<Scalars['String']>
}

export interface MerchantItems {
	__typename?: 'MerchantItems'
	continuationToken?: Maybe<Scalars['String']>
	items?: Maybe<Listing[]>
}

export interface MerchantProfile {
	__typename?: 'MerchantProfile'
	id: Scalars['ID']
	storeName?: Maybe<Scalars['String']>
	emailAddress?: Maybe<Scalars['String']>
	phoneNumber?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	avatar?: Maybe<MerchantProfileAvatars>
	legacyUserOwner?: Maybe<Scalars['Int']>
	publicLocationName?: Maybe<Scalars['String']>
	ratingSummary?: Maybe<MerchantRatingSummary>
	business?: Maybe<MerchantBusiness>
}

export interface MerchantProfileAvatars {
	__typename?: 'MerchantProfileAvatars'
	original?: Maybe<Image>
	large?: Maybe<Image>
	medium?: Maybe<Image>
	small?: Maybe<Image>
}

export interface MerchantRatingSummary {
	__typename?: 'MerchantRatingSummary'
	average: Scalars['String']
	count: Scalars['Int']
	transactions?: Maybe<MerchantTransactions>
}

export interface MerchantTransactions {
	__typename?: 'MerchantTransactions'
	sold?: Maybe<Scalars['Int']>
	purchased?: Maybe<Scalars['Int']>
}

export interface Message {
	__typename?: 'Message'
	id?: Maybe<Scalars['ID']>
	/** @deprecated Use `recipientId`. */
	recipient_id?: Maybe<Scalars['Int']>
	/** @deprecated Use `senderId`. */
	sender_id?: Maybe<Scalars['Int']>
	recipientId?: Maybe<Scalars['Int']>
	senderId?: Maybe<Scalars['Int']>
	text?: Maybe<Scalars['String']>
	/** @deprecated Use `sendDate`. */
	send_date?: Maybe<Scalars['Int']>
	sendDate?: Maybe<Scalars['Int']>
	metadata?: Maybe<MessageMetadata>
	metadataType?: Maybe<Scalars['Int']>
}

export interface MessageMetadata {
	__typename?: 'MessageMetadata'
	photos?: Maybe<Maybe<MessagePhoto>[]>
	messageUrl?: Maybe<Scalars['String']>
	systemMessageContext?: Maybe<SystemMessageContext>
	messageButtonText?: Maybe<Scalars['String']>
	messageTitle?: Maybe<Scalars['String']>
	place?: Maybe<Place>
}

export interface MessagePhoto {
	__typename?: 'MessagePhoto'
	small?: Maybe<Image>
	medium?: Maybe<Image>
	large?: Maybe<Image>
}

export interface MultifactorGeneratedResponse {
	__typename?: 'MultifactorGeneratedResponse'
	mfaReferenceId: Scalars['ID']
	mfaType: Scalars['String']
	userId: Scalars['ID']
}

export interface MultifactorHeaderInfo {
	userId: Scalars['ID']
	mfaReferenceId: Scalars['String']
	mfaType: Scalars['String']
	otp: Scalars['String']
}

export interface MultiFactorLoginUserInput {
	email: Scalars['String']
	password: Scalars['String']
	referenceId: Scalars['ID']
	type: Scalars['String']
	code: Scalars['String']
}

export interface MultiFactorMetadata {
	__typename?: 'MultiFactorMetadata'
	mfaReferenceId: Scalars['ID']
	mfaType: Scalars['String']
	description: Scalars['String']
}

export interface MultiFactorOption {
	__typename?: 'MultiFactorOption'
	type: Scalars['String']
	challengeGenerationUrl: Scalars['String']
	phoneNumber?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
}

export interface Mutation {
	__typename?: 'Mutation'
	trackAdImpression: Scalars['Boolean']
	saveCarBuyerProfile: Scalars['Boolean']
	saveAndSendCarBuyerProfile: Scalars['Boolean']
	sendExistingCarBuyerProfile: Scalars['Boolean']
	nudgeForCarBuyerProfile: Scalars['Boolean']
	createProxyNumber: ProxyNumber
	saveToQuickSave: BoardSummary
	addItemToSavedList?: Maybe<Scalars['Boolean']>
	deleteItemFromSavedList?: Maybe<Scalars['Boolean']>
	createSavedList?: Maybe<Scalars['Boolean']>
	deleteSavedList?: Maybe<Scalars['Boolean']>
	renameSavedList?: Maybe<Scalars['Boolean']>
	postFirstMessage: PostFirstMessageResponse
	postMessage?: Maybe<Scalars['Boolean']>
	updateReadDate?: Maybe<Scalars['Boolean']>
	markThreadAsRead?: Maybe<Scalars['Boolean']>
	createClaim: Claim
	submitReport: Scalars['Boolean']
	blockUser: Scalars['Boolean']
	unblockUser: Scalars['Boolean']
	rateTransaction?: Maybe<Scalars['Boolean']>
	archiveItem: Scalars['Boolean']
	itemViewed?: Maybe<Scalars['Boolean']>
	makeOffer?: Maybe<Scalars['Boolean']>
	suggestMeetupSpot: MeetupStatus
	clearUnseenNotificationCount: Scalars['Boolean']
	markSystemAlertAsRead: Scalars['Boolean']
	markAlertsAsRead: Scalars['Boolean']
	markAlertsAsUnread: Scalars['Boolean']
	archiveAlerts: Scalars['Boolean']
	unarchiveAlert: Scalars['Boolean']
	setNotificationPreferences: Scalars['Boolean']
	createOrder: Order
	updateOrderAddress: Order
	updateOrderPaymentMethod: Order
	confirmOrder?: Maybe<Scalars['Boolean']>
	kyc: DepositInfoNeededResponse[]
	instantPayout?: Maybe<PaymentUserData>
	verifyPaymentMethod: Scalars['Boolean']
	addDepositMethod: DepositMethodUserData
	addPaymentMethod: PaymentMethod
	addVirtualWallet: PaymentMethod
	setDefaultPaymentMethod: Scalars['Boolean']
	removePaymentMethod: Scalars['Boolean']
	createOrUpdateListingV2: Listing
	uploadPhotos: Maybe<S3Photo>[]
	generateS3PhotoUuids?: Maybe<S3Photo[]>
	activateInAppPurchase: PurchasedProductListing[]
	activateInAppBilling: PurchasedProductListing[]
	useInventoryItemPromo: Scalars['Boolean']
	purchasePromotionWeb: PurchasePromotionWebResponse
	searchPreferences?: Maybe<Scalars['Boolean']>
	createSearchAlert: Scalars['String']
	deleteSearchAlert: Scalars['String']
	markSold: Listing
	createShippingTransaction: ShippingData
	updateShippingTransactionBuyerAddress: ShippingData
	updateShippingTransactionOfferPrice: ShippingData
	updateShippingTransactionPaymentMethod: ShippingData
	updateShippingTransactionBuyerMakeOffer: ShippingData
	updateShippingTransactionBuyerCancelOffer: ShippingData
	updateShippingTransactionSellerAddress: ShippingData
	updateShippingTransactionSellerAccept: ShippingData
	updateShippingTransactionSellerReject: ShippingData
	updateShippingTransactionSellerRejectReason: ShippingData
	returnBuyerRequest: Scalars['Boolean']
	returnBuyerClose: Scalars['Boolean']
	returnSellerAccept: ShippingReturnView
	returnSellerDecline: Scalars['Boolean']
	reportDiscussion: ReportResponse
	reportItem: ReportResponse
	reportUser: ReportResponse
	followUser: Scalars['Boolean']
	unfollowUser: Scalars['Boolean']
	login: User
	multifactorLogin: User
	signup: User
	logout: Scalars['Boolean']
	federatedLogin: User
	createVanityUrl: VanityUrl
	connectFacebookAccount?: Maybe<Scalars['Boolean']>
	updateEmail: Scalars['Boolean']
	updateLocation: Scalars['Boolean']
	updateName: Scalars['Boolean']
	updateUserAccount: Scalars['Boolean']
	changeEmail: Scalars['Boolean']
	verifyPhoneNumber: Scalars['Boolean']
	verifyPhoneCode: Scalars['Boolean']
	setProfilePhoto: Scalars['Boolean']
	accountAvailable?: Maybe<AccountAvailability>
	resetPassword: Scalars['Boolean']
	resetPasswordConfirm: Scalars['Boolean']
	requestMultifactorCode: MultiFactorMetadata
	generateMultifactorChallenge: MultifactorGeneratedResponse
	generateEmailMultifactorChallenge: MultifactorGeneratedResponse
	changePassword: Scalars['Boolean']
	jwtTokenRefresh: JwtTokenRefreshResponse
}

export interface MutationTrackAdImpressionArgs {
	impressionUrl: Scalars['String']
}

export interface MutationSaveCarBuyerProfileArgs {
	buyerProfile: BuyerProfileInput
	itemId: ItemIdInput
}

export interface MutationSaveAndSendCarBuyerProfileArgs {
	buyerProfile: BuyerProfileInput
	itemId: ItemIdInput
}

export interface MutationSendExistingCarBuyerProfileArgs {
	itemId: ItemIdInput
}

export interface MutationNudgeForCarBuyerProfileArgs {
	itemId: ItemIdInput
}

export interface MutationCreateProxyNumberArgs {
	data: ProxyNumberInput
}

export interface MutationSaveToQuickSaveArgs {
	listingId: Scalars['Int']
}

export interface MutationAddItemToSavedListArgs {
	savedListId: Scalars['String']
	listingId: Scalars['Int']
}

export interface MutationDeleteItemFromSavedListArgs {
	savedListId: Scalars['String']
	listingId: Scalars['Int']
}

export interface MutationCreateSavedListArgs {
	data?: Maybe<CreateSavedListInput>
}

export interface MutationDeleteSavedListArgs {
	savedListId: Scalars['String']
}

export interface MutationRenameSavedListArgs {
	savedListId: Scalars['String']
	newName: Scalars['String']
}

export interface MutationPostFirstMessageArgs {
	data: PostFirstMessageInput
}

export interface MutationPostMessageArgs {
	data: PostMessageInput
	photoUuids?: Maybe<Scalars['String'][]>
}

export interface MutationUpdateReadDateArgs {
	data: UpdateReadDateInput
}

export interface MutationMarkThreadAsReadArgs {
	id: Scalars['ID']
}

export interface MutationCreateClaimArgs {
	data: CreateClaimInput
}

export interface MutationSubmitReportArgs {
	data?: Maybe<SubmitReportInput>
}

export interface MutationBlockUserArgs {
	userId: Scalars['ID']
}

export interface MutationUnblockUserArgs {
	userId: Scalars['ID']
}

export interface MutationRateTransactionArgs {
	data: RateTransactionInput
}

export interface MutationArchiveItemArgs {
	data: ArchiveInput
}

export interface MutationItemViewedArgs {
	data: ItemViewedEventInput
}

export interface MutationMakeOfferArgs {
	data?: Maybe<MakeOfferInput>
}

export interface MutationSuggestMeetupSpotArgs {
	args: SuggestMeetupSpotInput
}

export interface MutationClearUnseenNotificationCountArgs {
	alertType?: Maybe<AlertType>
}

export interface MutationMarkSystemAlertAsReadArgs {
	metadataId: Scalars['String']
}

export interface MutationMarkAlertsAsReadArgs {
	alertIds: Scalars['String'][]
}

export interface MutationMarkAlertsAsUnreadArgs {
	alertIds: Scalars['String'][]
}

export interface MutationArchiveAlertsArgs {
	alertIds: Scalars['String'][]
}

export interface MutationUnarchiveAlertArgs {
	alertId: Scalars['String']
}

export interface MutationSetNotificationPreferencesArgs {
	type: NotificationPreferenceType
	preferenceSummary?: Maybe<NotificationPreferencesSummaryInput>
}

export interface MutationCreateOrderArgs {
	data?: Maybe<CreateOrderInput>
}

export interface MutationUpdateOrderAddressArgs {
	data?: Maybe<UpdateAddressInput>
}

export interface MutationUpdateOrderPaymentMethodArgs {
	data?: Maybe<PaymentMethodInput>
}

export interface MutationConfirmOrderArgs {
	data: ConfirmOrderInput
}

export interface MutationKycArgs {
	token: Scalars['String']
}

export interface MutationInstantPayoutArgs {
	enabled: Scalars['Boolean']
}

export interface MutationVerifyPaymentMethodArgs {
	data: CardVerificationInput
}

export interface MutationAddDepositMethodArgs {
	token: Scalars['String']
	instantPayout?: Maybe<Scalars['Boolean']>
}

export interface MutationAddPaymentMethodArgs {
	token: Scalars['String']
}

export interface MutationAddVirtualWalletArgs {
	walletType: Scalars['String']
}

export interface MutationSetDefaultPaymentMethodArgs {
	payment_method_id: Scalars['Int']
}

export interface MutationRemovePaymentMethodArgs {
	payment_method_id: Scalars['Int']
}

export interface MutationCreateOrUpdateListingV2Args {
	listingInput: ListingInputV2
}

export interface MutationUploadPhotosArgs {
	photos: Scalars['Upload'][]
}

export interface MutationGenerateS3PhotoUuidsArgs {
	numberOfPhotos: Scalars['Int']
}

export interface MutationActivateInAppPurchaseArgs {
	data: ActivateIapInput
}

export interface MutationActivateInAppBillingArgs {
	data: ActivateIabInput
}

export interface MutationUseInventoryItemPromoArgs {
	data: UseInventoryItemPromoInput
}

export interface MutationPurchasePromotionWebArgs {
	data?: Maybe<PurchasePromotionWebInput>
}

export interface MutationSearchPreferencesArgs {
	params?: Maybe<Maybe<SearchParam>[]>
}

export interface MutationCreateSearchAlertArgs {
	params?: Maybe<Maybe<SearchParam>[]>
}

export interface MutationDeleteSearchAlertArgs {
	alertId?: Maybe<Scalars['String']>
}

export interface MutationMarkSoldArgs {
	listingId: Scalars['Int']
}

export interface MutationCreateShippingTransactionArgs {
	data?: Maybe<CreateShippingTransactionInput>
}

export interface MutationUpdateShippingTransactionBuyerAddressArgs {
	data: UpdateShippingAddressInput
}

export interface MutationUpdateShippingTransactionOfferPriceArgs {
	data: UpdateOfferPriceInput
}

export interface MutationUpdateShippingTransactionPaymentMethodArgs {
	data: UpdatePaymentMethodInput
}

export interface MutationUpdateShippingTransactionBuyerMakeOfferArgs {
	data: ShippingBuyerMakeOfferInput
}

export interface MutationUpdateShippingTransactionBuyerCancelOfferArgs {
	transactionId: Scalars['String']
}

export interface MutationUpdateShippingTransactionSellerAddressArgs {
	data: UpdateShippingAddressInput
}

export interface MutationUpdateShippingTransactionSellerAcceptArgs {
	transactionId: Scalars['String']
}

export interface MutationUpdateShippingTransactionSellerRejectArgs {
	transactionId: Scalars['String']
}

export interface MutationUpdateShippingTransactionSellerRejectReasonArgs {
	data: SellerRejectReasonInput
}

export interface MutationReturnBuyerRequestArgs {
	data?: Maybe<BuyerRequestReturnInput>
}

export interface MutationReturnBuyerCloseArgs {
	returnId: Scalars['String']
}

export interface MutationReturnSellerAcceptArgs {
	returnId: Scalars['String']
}

export interface MutationReturnSellerDeclineArgs {
	data?: Maybe<SellerDeclineReturnInput>
}

export interface MutationReportDiscussionArgs {
	data?: Maybe<ReportDiscussionInput>
}

export interface MutationReportItemArgs {
	data?: Maybe<ReportItemInput>
}

export interface MutationReportUserArgs {
	userId?: Maybe<Scalars['Int']>
}

export interface MutationFollowUserArgs {
	userId: Scalars['Int']
}

export interface MutationUnfollowUserArgs {
	userId: Scalars['Int']
}

export interface MutationLoginArgs {
	data?: Maybe<LoginUserInput>
}

export interface MutationMultifactorLoginArgs {
	data: MultiFactorLoginUserInput
}

export interface MutationSignupArgs {
	data?: Maybe<CreateUserInput>
}

export interface MutationFederatedLoginArgs {
	data?: Maybe<FederatedLoginInput>
}

export interface MutationCreateVanityUrlArgs {
	data?: Maybe<VanityUrlCreateinput>
}

export interface MutationConnectFacebookAccountArgs {
	data?: Maybe<ConnectFacebookAccountInput>
}

export interface MutationUpdateEmailArgs {
	data?: Maybe<EmailInput>
}

export interface MutationUpdateLocationArgs {
	latitude?: Maybe<Scalars['Float']>
	longitude?: Maybe<Scalars['Float']>
}

export interface MutationUpdateNameArgs {
	name: Scalars['String']
}

export interface MutationUpdateUserAccountArgs {
	data?: Maybe<UpdateUserAccountInput>
}

export interface MutationChangeEmailArgs {
	data: ChangeEmailInput
}

export interface MutationVerifyPhoneNumberArgs {
	data: VerifyPhoneNumberInput
}

export interface MutationVerifyPhoneCodeArgs {
	data: VerifyPhoneCode
}

export interface MutationSetProfilePhotoArgs {
	userId: Scalars['String']
	photoUuid: Scalars['String']
}

export interface MutationAccountAvailableArgs {
	email: Scalars['String']
}

export interface MutationResetPasswordArgs {
	email: Scalars['String']
}

export interface MutationResetPasswordConfirmArgs {
	password: Scalars['String']
	confirmationToken: Scalars['String']
}

export interface MutationRequestMultifactorCodeArgs {
	data: LoginUserInput
}

export interface MutationGenerateMultifactorChallengeArgs {
	path: Scalars['String']
}

export interface MutationGenerateEmailMultifactorChallengeArgs {
	userId: Scalars['ID']
	emailChallengeMetadata: EmailChallengeMetadataInput
}

export interface MutationChangePasswordArgs {
	data: ChangePasswordInput
}

export interface MutationJwtTokenRefreshArgs {
	data?: Maybe<JwtTokenRefreshInput>
}

export interface MyOffersSellingData {
	__typename?: 'MyOffersSellingData'
	hasPromotedListings?: Maybe<Scalars['Boolean']>
	hideSelleradsPurchaseOnWeb?: Maybe<Scalars['Boolean']>
	listings: Maybe<Listing>[]
	userContext: PromotionUserContext
	nextPageCursor?: Maybe<Scalars['String']>
}

export interface MyOffersSellingInput {
	listingId?: Maybe<Scalars['Int']>
	limit?: Maybe<Scalars['Int']>
	nextPageCursor?: Maybe<Scalars['String']>
	experimentId?: Maybe<Scalars['String']>
	sellFasterSimplificationVariant?: Maybe<Scalars['String']>
	isMISEnabled?: Maybe<Scalars['Boolean']>
}

export interface NotificationPreference {
	__typename?: 'NotificationPreference'
	type: Scalars['String']
	enabled: Scalars['Boolean']
	displayString: Scalars['String']
}

export interface NotificationPreferenceInput {
	type: Scalars['String']
	enabled: Scalars['Boolean']
	displayString: Scalars['String']
}

export interface NotificationPreferencesSummary {
	__typename?: 'NotificationPreferencesSummary'
	version: Scalars['Int']
	preferences: NotificationPreference[]
}

export interface NotificationPreferencesSummaryInput {
	version: Scalars['Int']
	preferences: NotificationPreferenceInput[]
}

export enum NotificationPreferenceType {
	Email = 'EMAIL',
	Push = 'PUSH',
}

export interface OpeningHour {
	__typename?: 'OpeningHour'
	day: Scalars['String']
	hours: Scalars['String'][]
}

export interface OptionCategories {
	__typename?: 'OptionCategories'
	label: Scalars['String']
	options: Options[]
}

export interface Options {
	__typename?: 'Options'
	selected?: Maybe<Scalars['Boolean']>
	key: Scalars['String']
	label: Scalars['String']
}

export interface Order {
	__typename?: 'Order'
	orderId: Scalars['String']
	sellerId?: Maybe<Scalars['String']>
	listingId?: Maybe<Scalars['String']>
	lineItemId: Scalars['String']
	orderState: Scalars['String']
	buyerOrderDetails?: Maybe<BuyerOrderDetails>
	buyerDetails?: Maybe<BuyerDetails>
	cancellation?: Maybe<Cancellation>
	paymentDetail?: Maybe<PaymentDetail>
	createdTimeStamp?: Maybe<Scalars['String']>
	fulfillment?: Maybe<Fulfillment>
	estimatedDelivery?: Maybe<EstimatedDelivery>
}

export enum OuTruYouStatus {
	JoinTruyou = 'JOIN_TRUYOU',
	TruyouPending = 'TRUYOU_PENDING',
	TruyouVerified = 'TRUYOU_VERIFIED',
	TruyouUnknown = 'TRUYOU_UNKNOWN',
}

export interface Payment {
	__typename?: 'Payment'
	id?: Maybe<Scalars['Int']>
	/** @deprecated Use `createdAt`. */
	created_at?: Maybe<Scalars['String']>
	/** @deprecated Use `authorizedAt`. */
	authorized_at?: Maybe<Scalars['String']>
	/** @deprecated Use `canceledAt`. */
	canceled_at?: Maybe<Scalars['String']>
	/** @deprecated Use `submittedForSettlementAt`. */
	submitted_for_settlement_at?: Maybe<Scalars['String']>
	/** @deprecated Use `refundedAt`. */
	refunded_at?: Maybe<Scalars['String']>
	/** @deprecated Use `settledAt`. */
	settled_at?: Maybe<Scalars['String']>
	/** @deprecated Use `disbursedAt`. */
	disbursed_at?: Maybe<Scalars['String']>
	/** @deprecated Use `buyerDiscountTransferredAt`. */
	buyer_discount_transferred_at?: Maybe<Scalars['String']>
	createdAt?: Maybe<Scalars['String']>
	authorizedAt?: Maybe<Scalars['String']>
	canceledAt?: Maybe<Scalars['String']>
	submittedForSettlementAt?: Maybe<Scalars['String']>
	refundedAt?: Maybe<Scalars['String']>
	settledAt?: Maybe<Scalars['String']>
	disbursedAt?: Maybe<Scalars['String']>
	buyerDiscountTransferredAt?: Maybe<Scalars['String']>
	amount?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentDate`. */
	payment_date?: Maybe<Scalars['String']>
	/** @deprecated Use `transactionNumber`. */
	transaction_number?: Maybe<Scalars['String']>
	paymentDate?: Maybe<Scalars['String']>
	transactionNumber?: Maybe<Scalars['String']>
	payer?: Maybe<Scalars['Int']>
	payee?: Maybe<Scalars['Int']>
	canceler?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentMethodUsed`. */
	payment_method_used?: Maybe<Scalars['Int']>
	/** @deprecated Use `paymentGateway`. */
	payment_gateway?: Maybe<Scalars['Int']>
	/** @deprecated Use `paymentGatewayPaymentId`. */
	payment_gateway_payment_id?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentGatewayDiscountId`. */
	payment_gateway_discount_id?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentGatewayPaymentPayoutId`. */
	payment_gateway_payment_payout_id?: Maybe<Scalars['String']>
	/** @deprecated Use `buyerDebitAmount`. */
	buyer_debit_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `offerupDebitAmount`. */
	offerup_debit_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `commisionAmount`. */
	commision_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `feeCollectedFromBuyerAmount`. */
	fee_collected_from_buyer_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `feeCollectedFromOfferupAmount`. */
	fee_collected_from_offerup_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalFeesAmount`. */
	additional_fees_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalFeesFromBuyerAmount`. */
	additional_fees_from_buyer_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalFeesFromOfferupAmount`. */
	additional_fees_from_offerup_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalSellerFeesAmount`. */
	additional_seller_fees_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalSellerFeesFromBuyerAmount`. */
	additional_seller_fees_from_buyer_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `additionalSellerFeesFromOfferupAmount`. */
	additional_seller_fees_from_offerup_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `payoutAmount`. */
	payout_amount?: Maybe<Scalars['String']>
	/** @deprecated Use `payoutAmountFromOfferup`. */
	payout_amount_from_offerup?: Maybe<Scalars['String']>
	/** @deprecated Use `payoutAmountFromBuyer`. */
	payout_amount_from_buyer?: Maybe<Scalars['String']>
	/** @deprecated Use `commisionRate`. */
	commision_rate?: Maybe<Scalars['String']>
	/** @deprecated Use `commisionRateReason`. */
	commision_rate_reason?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentStatus`. */
	payment_status?: Maybe<Scalars['Int']>
	/** @deprecated Use `cancelReason`. */
	cancel_reason?: Maybe<Scalars['String']>
	/** @deprecated Use `reviewStatus`. */
	review_status?: Maybe<Scalars['String']>
	/** @deprecated Use `reviewNotes`. */
	review_notes?: Maybe<Scalars['String']>
	/** @deprecated Use `markedForReviewBy`. */
	marked_for_review_by?: Maybe<Scalars['String']>
	/** @deprecated Use `markedAsResolvedBy`. */
	marked_as_resolved_by?: Maybe<Scalars['String']>
	/** @deprecated Use `refundSource`. */
	refund_source?: Maybe<Scalars['String']>
	/** @deprecated Use `paymentSource`. */
	payment_source?: Maybe<Scalars['String']>
	/** @deprecated Use `autoSettle`. */
	auto_settle?: Maybe<Scalars['Boolean']>
	paymentMethodUsed?: Maybe<Scalars['Int']>
	paymentGateway?: Maybe<Scalars['Int']>
	paymentGatewayPaymentId?: Maybe<Scalars['String']>
	paymentGatewayDiscountId?: Maybe<Scalars['String']>
	paymentGatewayPaymentPayoutId?: Maybe<Scalars['String']>
	buyerDebitAmount?: Maybe<Scalars['String']>
	offerupDebitAmount?: Maybe<Scalars['String']>
	commisionAmount?: Maybe<Scalars['String']>
	feeCollectedFromBuyerAmount?: Maybe<Scalars['String']>
	feeCollectedFromOfferupAmount?: Maybe<Scalars['String']>
	additionalFeesAmount?: Maybe<Scalars['String']>
	additionalFeesFromBuyerAmount?: Maybe<Scalars['String']>
	additionalFeesFromOfferupAmount?: Maybe<Scalars['String']>
	additionalSellerFeesAmount?: Maybe<Scalars['String']>
	additionalSellerFeesFromBuyerAmount?: Maybe<Scalars['String']>
	additionalSellerFeesFromOfferupAmount?: Maybe<Scalars['String']>
	payoutAmount?: Maybe<Scalars['String']>
	payoutAmountFromOfferup?: Maybe<Scalars['String']>
	payoutAmountFromBuyer?: Maybe<Scalars['String']>
	commisionRate?: Maybe<Scalars['String']>
	commisionRateReason?: Maybe<Scalars['String']>
	paymentStatus?: Maybe<Scalars['Int']>
	cancelReason?: Maybe<Scalars['String']>
	reviewStatus?: Maybe<Scalars['String']>
	reviewNotes?: Maybe<Scalars['String']>
	markedForReviewBy?: Maybe<Scalars['String']>
	markedAsResolvedBy?: Maybe<Scalars['String']>
	refundSource?: Maybe<Scalars['String']>
	paymentSource?: Maybe<Scalars['String']>
	autoSettle?: Maybe<Scalars['Boolean']>
	order?: Maybe<PaymentOrder>
	/** @deprecated Use `paymentMethod`. */
	payment_method?: Maybe<PaymentMethod>
	paymentMethod?: Maybe<PaymentMethod>
}

export interface PaymentAccountData {
	__typename?: 'PaymentAccountData'
	/** @deprecated Use `totalBalance`. */
	total_balance?: Maybe<Scalars['String']>
	totalBalance?: Maybe<Scalars['String']>
	balance?: Maybe<Scalars['String']>
	/** @deprecated Use `depositMethods`. */
	deposit_methods: DepositMethod[]
	/** @deprecated Use `paymentUserData`. */
	payment_user_data?: Maybe<PaymentUserData>
	/** @deprecated Use `paymentMethods`. */
	payment_methods: PaymentMethod[]
	/** @deprecated Use `supportedPaymentMethods`. */
	supported_payment_methods: Scalars['String'][]
	depositMethods: DepositMethod[]
	paymentUserData?: Maybe<PaymentUserData>
	paymentMethods: PaymentMethod[]
	supportedPaymentMethods: Scalars['String'][]
	infoNeeded: DepositInfoNeededResponse[]
}

export interface PaymentDetail {
	__typename?: 'PaymentDetail'
	paymentMethod?: Maybe<PaymentMethod>
}

export interface PaymentHistory {
	__typename?: 'PaymentHistory'
	title?: Maybe<Scalars['String']>
	payment?: Maybe<Payment>
	listing?: Maybe<Listing>
}

export interface PaymentMethod {
	__typename?: 'PaymentMethod'
	/** @deprecated Use `updatedDate`. */
	updated_date?: Maybe<Scalars['String']>
	updatedDate?: Maybe<Scalars['String']>
	default?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `billingZipcode`. */
	billing_zipcode?: Maybe<Scalars['String']>
	billingZipcode?: Maybe<Scalars['String']>
	token?: Maybe<Scalars['String']>
	/** @deprecated Use `createdDate`. */
	created_date?: Maybe<Scalars['String']>
	createdDate?: Maybe<Scalars['String']>
	type?: Maybe<Scalars['String']>
	id: Scalars['Int']
	/** @deprecated Use `creditCard`. */
	credit_card?: Maybe<CreditCard>
	creditCard?: Maybe<CreditCard>
}

export interface PaymentMethodInput {
	orderId: Scalars['String']
	paymentMethodId: Scalars['String']
}

export interface PaymentOrder {
	__typename?: 'PaymentOrder'
	/** @deprecated Use `createdAt`. */
	created_at?: Maybe<Scalars['String']>
	createdAt?: Maybe<Scalars['String']>
	id?: Maybe<Scalars['Int']>
	/** @deprecated Use `orderStatus`. */
	order_status?: Maybe<Scalars['Int']>
	orderStatus?: Maybe<Scalars['Int']>
}

export interface PaymentUserData {
	__typename?: 'PaymentUserData'
	/** @deprecated Use `acknowledgedPayments`. */
	acknowledged_payments?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `optInToInstantPayouts`. */
	opt_in_to_instant_payouts?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `paymentEnabled`. */
	payment_enabled?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `sellerPaymentEnabled`. */
	seller_payment_enabled?: Maybe<Scalars['Boolean']>
	acknowledgedPayments?: Maybe<Scalars['Boolean']>
	optInToInstantPayouts?: Maybe<Scalars['Boolean']>
	paymentEnabled?: Maybe<Scalars['Boolean']>
	sellerPaymentEnabled?: Maybe<Scalars['Boolean']>
}

export interface PayPerPostAutosInput {
	categoryId: Scalars['ID']
}

export interface PayPerPostDetails {
	__typename?: 'PayPerPostDetails'
	purchaseOptions?: Maybe<PayPerPostPurchaseOption[]>
	runningPostCount: Scalars['Int']
	userPurchaseState: Scalars['String']
	overview?: Maybe<PayPerPostOverview>
}

export interface PayPerPostFooter {
	__typename?: 'PayPerPostFooter'
	linkText: Scalars['String']
	linkType: Scalars['String']
	linkModal: PayPerPostLinkModal
}

export interface PayPerPostLinkModal {
	__typename?: 'PayPerPostLinkModal'
	title: Scalars['String']
	description: Scalars['String']
	buttonText: Scalars['String']
	buttonUrl: Scalars['String']
	buttonUrlType: Scalars['String']
	phoneNumber: Scalars['String']
}

export interface PayPerPostOverview {
	__typename?: 'PayPerPostOverview'
	title?: Maybe<Scalars['String']>
	description: Scalars['String']
	linkText: Scalars['String']
	linkUrl: Scalars['String']
	urlType: Scalars['String']
	tag: PayPerPostTag
	footer?: Maybe<PayPerPostFooter>
}

export interface PayPerPostPaymentData {
	__typename?: 'PayPerPostPaymentData'
	sku: Scalars['String']
	priceToDisplay: Scalars['String']
	priceCurrencyCode: Scalars['String']
	microunits: Scalars['Int']
}

export interface PayPerPostPurchaseOption {
	__typename?: 'PayPerPostPurchaseOption'
	name: Scalars['String']
	selected: Scalars['Boolean']
	optionType: Scalars['Int']
	purchaseBundles?: Maybe<PurchaseBundle[]>
}

export interface PayPerPostTag {
	__typename?: 'PayPerPostTag'
	text: Scalars['String']
	type: Scalars['String']
}

export interface PerformanceMetaData {
	__typename?: 'PerformanceMetaData'
	itemId: Scalars['ID']
	title: Scalars['String']
	subtitle?: Maybe<Scalars['String']>
	chartSummary?: Maybe<Scalars['String']>
	image: Image
	itemState?: Maybe<Scalars['Int']>
	callToActionText?: Maybe<Scalars['String']>
	startTime?: Maybe<Scalars['String']>
	endTime?: Maybe<Scalars['String']>
}

export interface Photo {
	__typename?: 'Photo'
	uuid: Scalars['String']
	/** @deprecated Use `detailFull`. */
	detail_full: Image
	detailFull: Image
	list?: Maybe<Image>
	detail?: Maybe<Image>
	mainImage?: Maybe<Scalars['Boolean']>
	position?: Maybe<Scalars['Int']>
	detailSquare?: Maybe<Image>
}

export interface Place {
	__typename?: 'Place'
	name?: Maybe<Scalars['String']>
	formattedAddress?: Maybe<Scalars['String']>
	placeId: Scalars['ID']
	longitude?: Maybe<Scalars['String']>
	latitude?: Maybe<Scalars['String']>
}

export interface PostFirstMessageInput {
	itemId: Scalars['ID']
	text: Scalars['String']
	suggestedMessageUuid?: Maybe<Scalars['String']>
}

export interface PostFirstMessageResponse {
	__typename?: 'PostFirstMessageResponse'
	discussionId: Scalars['ID']
}

export interface PostMessageInput {
	discussionId: Scalars['String']
	text?: Maybe<Scalars['String']>
}

export interface PostShippability {
	__typename?: 'PostShippability'
	allowShipping: Scalars['Boolean']
	allowBuyNow: Scalars['Boolean']
	shippingDisabledReason?: Maybe<PostShippingDisabledReason>
	shippingEnabledByDefault: Scalars['Boolean']
}

export interface PostShippingDisabledReason {
	__typename?: 'PostShippingDisabledReason'
	title: Scalars['String']
	body?: Maybe<Scalars['String']>
}

export interface PromotionFeature {
	__typename?: 'PromotionFeature'
	description?: Maybe<Scalars['String']>
	available?: Maybe<Scalars['Boolean']>
}

export interface PromotionPaymentData {
	__typename?: 'PromotionPaymentData'
	sku: Scalars['String']
	priceToDisplay: Scalars['String']
	priceCurrencyCode: Scalars['String']
	microunits: Scalars['Int']
	isFreeTrial?: Maybe<Scalars['Boolean']>
}

export interface PromotionResultsChunk {
	__typename?: 'PromotionResultsChunk'
	pageCursor?: Maybe<Scalars['String']>
	results?: Maybe<ItemPerformanceInfo[]>
}

export interface PromotionSpecials {
	__typename?: 'PromotionSpecials'
	specialType?: Maybe<Scalars['String']>
	promoType?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
}

export interface PromotionUserContext {
	__typename?: 'PromotionUserContext'
	subscriptions?: Maybe<Maybe<IapSubscription>[]>
	subscriptionsToAcquire?: Maybe<Maybe<IapSubscription>[]>
}

export interface Property {
	__typename?: 'Property'
	key: Scalars['String']
	value: Scalars['String']
	label: Scalars['String']
}

export interface ProxyNumber {
	__typename?: 'ProxyNumber'
	proxyNumber: Scalars['String']
	expirationTime: Scalars['String']
}

export interface ProxyNumberInput {
	buyerId: Scalars['String']
	listingId: Scalars['String']
	sellerId: Scalars['Int']
}

export interface PublicLocation {
	__typename?: 'PublicLocation'
	latitude?: Maybe<Scalars['Float']>
	longitude?: Maybe<Scalars['Float']>
	name?: Maybe<Scalars['String']>
	formattedAddress?: Maybe<Scalars['String']>
}

export interface PurchaseBundle {
	__typename?: 'PurchaseBundle'
	promoType: Scalars['String']
	paymentDataAndroid?: Maybe<PayPerPostPaymentData>
	paymentDataIos?: Maybe<PayPerPostPaymentData>
}

export interface PurchasedItemPromo {
	__typename?: 'PurchasedItemPromo'
	purchaseDate?: Maybe<Scalars['String']>
	promoType?: Maybe<Scalars['String']>
	startDate?: Maybe<Scalars['String']>
	endDate?: Maybe<Scalars['String']>
}

export interface PurchasedItemPromos {
	__typename?: 'PurchasedItemPromos'
	expiredPromos?: Maybe<PurchasedItemPromosCollection>
	activePromos?: Maybe<PurchasedItemPromosCollection>
	futurePromos?: Maybe<PurchasedItemPromosCollection>
	stackedDate?: Maybe<Scalars['String']>
	isPromoted?: Maybe<Scalars['Boolean']>
	hasExpiredPromos?: Maybe<Scalars['Boolean']>
	hasActiveSubscription?: Maybe<Scalars['Boolean']>
}

export interface PurchasedItemPromosCollection {
	__typename?: 'PurchasedItemPromosCollection'
	promotions?: Maybe<Maybe<PurchasedItemPromo>[]>
	labelName?: Maybe<Scalars['String']>
	noEndDate?: Maybe<Scalars['Boolean']>
	stackedExpirationTime?: Maybe<Scalars['String']>
}

export interface PurchasedProductListing {
	__typename?: 'PurchasedProductListing'
	smallImageUrl?: Maybe<Scalars['String']>
	itemId?: Maybe<Scalars['Int']>
	title?: Maybe<Scalars['String']>
}

export interface PurchasePromotionWebInput {
	transactionId: Scalars['String']
	paymentMethodId: Scalars['Int']
	userId: Scalars['Int']
	itemId: Scalars['Int']
	promoType: Scalars['String']
	isUserInitiated?: Maybe<Scalars['Boolean']>
	platform: Scalars['String']
	priceMicrounits: Scalars['Int']
}

export interface PurchasePromotionWebResponse {
	__typename?: 'PurchasePromotionWebResponse'
	title?: Maybe<Scalars['String']>
	subtitle?: Maybe<Scalars['String']>
	message?: Maybe<Scalars['String']>
}

export interface Query {
	__typename?: 'Query'
	suggestions: SuggestionResponse
	vehicles: VehiclesResponse
	vehicleStyles: VehicleStylesResponse
	vehicleFeatures: VehicleFeaturesResponse
	autoBuyerProfile?: Maybe<BuyerProfile>
	savedLists: Maybe<SavedList>[]
	savedListsWithListingStatus: Maybe<ItemSavedStatus>[]
	savedListItems: SavedListItems
	getTaxonomy: CategoryTaxonomy
	getCategoryAttributes: CategoryAttributes
	discussion?: Maybe<Discussion>
	suggestedMessageForItem: SuggestedMessageResponse
	sellerDiscussions: Maybe<SellerDiscussion>[]
	sellerDiscussionsPaged: SellerDiscussionPage
	channel?: Maybe<AblyChannelConfig>
	claimEligibility: Claim
	updateApp: UpdateAppResponse
	getReportReasons: ReportReasons[]
	listing: Listing
	newListingForOwnerAndSku?: Maybe<Listing>
	newListingForOwner?: Maybe<Maybe<Listing>[]>
	itemlists?: Maybe<ItemListsData>
	categories?: Maybe<CategoriesData>
	rateTransaction?: Maybe<RatingResponse>
	rateInteraction?: Maybe<RatingResponse>
	markSold: Listing
	helloLocation: Scalars['String']
	meetupSpots: MeetupSpot[]
	getMeetupStatus: MeetupStatus
	/** @deprecated Use `alertsWithAds`. */
	alerts: AlertsResponse
	alertsWithAds: AlertsResponse
	unseenNotificationCount: UnseenAlertCount
	notificationPreferences: NotificationPreferencesSummary
	orderReceipt: Receipt
	bestShippingOption?: Maybe<ShippingRate>
	paymentAccount: PaymentAccountData
	paymentHistory?: Maybe<TransactionHistory[]>
	fetchPaymentMethods: PaymentMethod[]
	depositInfoNeeded?: Maybe<DepositInfoNeededResponse>
	itemPerformance: ItemPerformanceInfo
	promotionResults: PromotionResultsChunk
	autoCategorizeListing: ItemCategorization
	shippability: PostShippability
	evaluatePayPerPost?: Maybe<PayPerPostDetails>
	/** @deprecated Use mutation of 'generateS3PhotoUuids' */
	generateS3PhotoUuids?: Maybe<S3Photo[]>
	availablePromosForListing: AvailableItemPromoData
	relatedSearches: RelatedSearchTopics
	search?: Maybe<SearchResponse>
	searchAlerts?: Maybe<SearchAlertResponse>
	fetchMyOfferSellingData: MyOffersSellingData
	fetchListingDashboardData: ListingDashboardData
	fetchShippingPostingInfo: ShippingPostingInfo
	fetchShippingWIMM: ShippingWimmData
	getSummaryShippingTransaction: ShippingSummary
	getReturnBuyerView: ShippingReturnView
	getReturnSellerView: ShippingReturnView
	getShippingTransaction: ShippingData
	termsOfService: TermsOfService
	helloTesting: Scalars['String']
	publicMerchantProfile: MerchantProfile
	merchantItems?: Maybe<MerchantItems>
	vanityUrlCheckMerchant: VanityUrlCheckResult
	userRelationship: UserRelationshipResponse
	userConnection?: Maybe<UserConnection>
	me: User
	publicProfile: UserProfile
	userItems?: Maybe<Listing[]>
	vanityUrl: VanityUrl
	vanityUrlCheck: VanityUrlCheckResult
	federatedLoginInfo: FederatedLoginInfo
	incentivizedLink: IncentivizedLinkInfo
	archivedItems: ArchivedItems
	user: User
	multifactorOptions: MultiFactorOption[]
}

export interface QuerySuggestionsArgs {
	prefix: Scalars['String']
	deliveryParam?: Maybe<Scalars['String']>
}

export interface QueryVehiclesArgs {
	syncToken?: Maybe<Scalars['String']>
}

export interface QueryVehicleStylesArgs {
	year: Scalars['String']
	make: Scalars['String']
	model: Scalars['String']
}

export interface QueryVehicleFeaturesArgs {
	id: Scalars['String']
}

export interface QuerySavedListsWithListingStatusArgs {
	listingId: Scalars['Int']
}

export interface QuerySavedListItemsArgs {
	savedListId: Scalars['String']
	page: Scalars['Int']
}

export interface QueryGetCategoryAttributesArgs {
	id: Scalars['ID']
}

export interface QueryDiscussionArgs {
	data: DiscussionsInput
}

export interface QuerySuggestedMessageForItemArgs {
	itemId: Scalars['ID']
}

export interface QuerySellerDiscussionsArgs {
	data: SellerDiscussionsInput
}

export interface QuerySellerDiscussionsPagedArgs {
	data: SellerDiscussionsInput
}

export interface QueryClaimEligibilityArgs {
	data: ClaimEligibilityInput
}

export interface QueryUpdateAppArgs {
	appVersion: Scalars['String']
}

export interface QueryGetReportReasonsArgs {
	data?: Maybe<GetReportReasonInput>
}

export interface QueryListingArgs {
	id?: Maybe<Scalars['Int']>
	vehicleHistoryExperiment?: Maybe<Scalars['String']>
	withNewEndpoint?: Maybe<Scalars['Boolean']>
	itemId?: Maybe<Scalars['Int']>
	listingId?: Maybe<Scalars['ID']>
}

export interface QueryNewListingForOwnerAndSkuArgs {
	ownerId?: Maybe<Scalars['ID']>
	sku?: Maybe<Scalars['String']>
}

export interface QueryNewListingForOwnerArgs {
	ownerId?: Maybe<Scalars['ID']>
}

export interface QueryRateTransactionArgs {
	listingId: Scalars['ID']
}

export interface QueryRateInteractionArgs {
	listingId: Scalars['ID']
	userId: Scalars['ID']
}

export interface QueryMarkSoldArgs {
	itemId: Scalars['Int']
}

export interface QueryMeetupSpotsArgs {
	location?: Maybe<LocationInput>
}

export interface QueryGetMeetupStatusArgs {
	buyerId: Scalars['String']
	itemId: Scalars['String']
}

export interface QueryAlertsArgs {
	type: AlertType
}

export interface QueryAlertsWithAdsArgs {
	type?: Maybe<AlertType>
}

export interface QueryNotificationPreferencesArgs {
	type: NotificationPreferenceType
}

export interface QueryOrderReceiptArgs {
	data?: Maybe<ReceiptInput>
}

export interface QueryBestShippingOptionArgs {
	data?: Maybe<BestShipppingInput>
}

export interface QueryItemPerformanceArgs {
	itemId: Scalars['ID']
}

export interface QueryPromotionResultsArgs {
	pageCursor?: Maybe<Scalars['String']>
}

export interface QueryAutoCategorizeListingArgs {
	title: Scalars['String']
	postSessionId: Scalars['String']
}

export interface QueryShippabilityArgs {
	title: Scalars['String']
	categoryId: Scalars['ID']
	description?: Maybe<Scalars['String']>
	latitude: Scalars['String']
	longitude: Scalars['String']
	zipcode: Scalars['String']
	postSessionId: Scalars['String']
}

export interface QueryEvaluatePayPerPostArgs {
	payPerPostInput: PayPerPostAutosInput
}

export interface QueryGenerateS3PhotoUuidsArgs {
	numberOfPhotos: Scalars['Int']
}

export interface QueryAvailablePromosForListingArgs {
	data: GetAvailablePromosInput
}

export interface QueryRelatedSearchesArgs {
	categoryId?: Maybe<Scalars['String']>
}

export interface QuerySearchArgs {
	params?: Maybe<Maybe<SearchParam>[]>
}

export interface QueryFetchMyOfferSellingDataArgs {
	data: MyOffersSellingInput
}

export interface QueryFetchListingDashboardDataArgs {
	data: MyOffersSellingInput
}

export interface QueryFetchShippingWimmArgs {
	paymentId: Scalars['Int']
}

export interface QueryGetSummaryShippingTransactionArgs {
	data?: Maybe<FetchShippingTransactionInput>
}

export interface QueryGetReturnBuyerViewArgs {
	returnId: Scalars['String']
}

export interface QueryGetReturnSellerViewArgs {
	returnId: Scalars['String']
}

export interface QueryGetShippingTransactionArgs {
	data?: Maybe<FetchShippingTransactionInput>
}

export interface QueryPublicMerchantProfileArgs {
	uuid: Scalars['ID']
}

export interface QueryMerchantItemsArgs {
	uuid: Scalars['ID']
	pageSize?: Maybe<Scalars['Int']>
	continuationToken?: Maybe<Scalars['String']>
}

export interface QueryVanityUrlCheckMerchantArgs {
	data?: Maybe<VanityUrlCheckInput>
}

export interface QueryUserRelationshipArgs {
	userId?: Maybe<Scalars['Int']>
}

export interface QueryUserConnectionArgs {
	data?: Maybe<UserConnectionInput>
}

export interface QueryPublicProfileArgs {
	userId: Scalars['Int']
}

export interface QueryUserItemsArgs {
	userId: Scalars['Int']
	page?: Maybe<Scalars['Int']>
	pageSize?: Maybe<Scalars['Int']>
}

export interface QueryVanityUrlArgs {
	data?: Maybe<VanityUserUrlInput>
}

export interface QueryVanityUrlCheckArgs {
	data?: Maybe<VanityUrlCheckInput>
}

export interface QueryFederatedLoginInfoArgs {
	data: FederatedLoginInfoInput
}

export interface QueryIncentivizedLinkArgs {
	data: IncentivizedLinkInput
}

export interface QueryArchivedItemsArgs {
	pageIndex: Scalars['Int']
	buyingScreen: Scalars['Boolean']
}

export interface QueryUserArgs {
	userId: Scalars['Int']
}

export interface QueryMultifactorOptionsArgs {
	userId: Scalars['ID']
}

export interface RateTransactionInput {
	listingId: Scalars['ID']
	ratedUserId: Scalars['ID']
	rating: Scalars['Int']
	selectedAttributes?: Maybe<Scalars['String'][]>
}

export interface RatingAttribute {
	__typename?: 'RatingAttribute'
	count: Scalars['Int']
	value: Scalars['String']
}

export interface RatingResponse {
	__typename?: 'RatingResponse'
	listing: Listing
	users?: Maybe<User[]>
	alreadyRated?: Maybe<Scalars['Boolean']>
	starAttributes: StarAttributes[]
	extraAttributes?: Maybe<Scalars['String'][]>
}

export interface RatingSummary {
	__typename?: 'RatingSummary'
	count: Scalars['Int']
	average: Scalars['Float']
}

export interface Receipt {
	__typename?: 'Receipt'
	listing?: Maybe<Listing>
	sellerProfile?: Maybe<MerchantProfile>
	order?: Maybe<Order>
	receiptStatus?: Maybe<ReceiptStatus>
}

export interface ReceiptInput {
	orderId: Scalars['String']
}

export enum ReceiptMilestoneState {
	Purchased = 'PURCHASED',
	Shipped = 'SHIPPED',
	Delivered = 'DELIVERED',
	Refunded = 'REFUNDED',
	Canceled = 'CANCELED',
	Unknown = 'UNKNOWN',
}

export interface ReceiptStatus {
	__typename?: 'ReceiptStatus'
	canContactSeller?: Maybe<Scalars['Boolean']>
	canRequestRefund?: Maybe<Scalars['Boolean']>
	previousStatuses?: Maybe<Maybe<StatusMilestone>[]>
	nextStatuses?: Maybe<Maybe<StatusMilestone>[]>
}

export interface RelatedSearchTopics {
	__typename?: 'RelatedSearchTopics'
	topics?: Maybe<Maybe<Scalars['String']>[]>
}

export interface ReportDiscussionInput {
	discussionId: Scalars['String']
}

export interface ReportItemInput {
	itemId: Scalars['String']
}

export interface ReportReasons {
	__typename?: 'ReportReasons'
	id: Scalars['ID']
	name: Scalars['String']
}

export enum ReportReasonType {
	User = 'USER',
	Item = 'ITEM',
	Discussion = 'DISCUSSION',
}

export interface ReportResponse {
	__typename?: 'ReportResponse'
	token: Scalars['String']
	userId: Scalars['Int']
	reason: Scalars['Int']
	reportUrl: Scalars['String']
}

export enum ReturnViewState {
	BuyerViewWaitingForInspection = 'BUYER_VIEW_WAITING_FOR_INSPECTION',
	BuyerViewInspectionExpired = 'BUYER_VIEW_INSPECTION_EXPIRED',
	BuyerViewBuyerRequestedReturn = 'BUYER_VIEW_BUYER_REQUESTED_RETURN',
	BuyerViewInspectionClosed = 'BUYER_VIEW_INSPECTION_CLOSED',
	BuyerViewBuyerProtectionClaimSubmitted = 'BUYER_VIEW_BUYER_PROTECTION_CLAIM_SUBMITTED',
	SellerViewBuyerRequestedReturn = 'SELLER_VIEW_BUYER_REQUESTED_RETURN',
	SellerViewBuyerRequestedReturnExpired = 'SELLER_VIEW_BUYER_REQUESTED_RETURN_EXPIRED',
	SellerViewSellerAcceptedReturn = 'SELLER_VIEW_SELLER_ACCEPTED_RETURN',
	SellerViewSellerAcceptedReturnExpired = 'SELLER_VIEW_SELLER_ACCEPTED_RETURN_EXPIRED',
	SellerViewSellerDeclinedReturn = 'SELLER_VIEW_SELLER_DECLINED_RETURN',
	Unknown = 'UNKNOWN',
}

export interface Review {
	__typename?: 'Review'
	attributionIcon?: Maybe<Scalars['String']>
	average?: Maybe<Scalars['String']>
	readMoreUrl?: Maybe<Scalars['String']>
	title?: Maybe<Scalars['String']>
	userReviews?: Maybe<UserReview[]>
}

export interface S3Photo {
	__typename?: 'S3Photo'
	location: Scalars['String']
	uuid: Scalars['String']
}

export interface SavedList {
	__typename?: 'SavedList'
	id: Scalars['String']
	name: Scalars['String']
	isQuickSave?: Maybe<Scalars['Boolean']>
	itemCount: Scalars['Int']
	photo?: Maybe<Scalars['String']>
}

export interface SavedListItem {
	__typename?: 'SavedListItem'
	id: Scalars['ID']
	title: Scalars['String']
	price: Scalars['String']
	photo: Scalars['String']
}

export interface SavedListItems {
	__typename?: 'SavedListItems'
	items?: Maybe<SavedListItem[]>
	currentPage: Scalars['Int']
}

export interface SearchAlert {
	__typename?: 'SearchAlert'
	alertId?: Maybe<Scalars['String']>
	query?: Maybe<Scalars['String']>
	filters?: Maybe<Scalars['String']>
}

export interface SearchAlertResponse {
	__typename?: 'SearchAlertResponse'
	alerts?: Maybe<Maybe<SearchAlert>[]>
}

export interface SearchData {
	__typename?: 'SearchData'
	searchPerformedEventUniqueId?: Maybe<Scalars['String']>
	searchSessionId?: Maybe<Scalars['String']>
}

export interface SearchParam {
	key: Scalars['String']
	value?: Maybe<Scalars['String']>
}

export interface SearchResponse {
	__typename?: 'SearchResponse'
	/** @deprecated Use `nextPageCursor`. */
	next_page_cursor?: Maybe<Scalars['String']>
	nextPageCursor?: Maybe<Scalars['String']>
	query?: Maybe<Scalars['String']>
	/** @deprecated Use `operationContext`. */
	operation_context?: Maybe<Scalars['String']>
	operationContext?: Maybe<Scalars['String']>
	/** @deprecated Use `shippingFilter`. */
	shipping_filter?: Maybe<ShippingFilter>
	shippingFilter?: Maybe<ShippingFilter>
	searchAlert?: Maybe<SearchAlert>
	/** @deprecated Use `feedOptions`. */
	feed_options?: Maybe<FeedOptions[]>
	feedOptions?: Maybe<FeedOptions[]>
	feed_items?: Maybe<FeedItem[]>
	feedItems?: Maybe<FeedItem[]>
	feedPresentation?: Maybe<FeedPresentation>
	/** @deprecated Use `searchSessionId`. */
	search_session_id?: Maybe<Scalars['String']>
	searchSessionId?: Maybe<Scalars['String']>
	searchSuggestion?: Maybe<SearchSuggestion>
	searchData?: Maybe<SearchData>
}

export interface SearchSuggestion {
	__typename?: 'SearchSuggestion'
	originalQuery?: Maybe<Scalars['String']>
	suggestedQuery?: Maybe<Scalars['String']>
}

export enum SelectionMode {
	SimpleList = 'SimpleList',
}

export type SellerAd = BaseAd & {
	__typename?: 'SellerAd'
	ouAdId: Scalars['String']
	adMediationId: Scalars['String']
	adExperimentId: Scalars['String']
	adRequestId: Scalars['String']
	adNetwork: Scalars['String']
	type: Scalars['String']
	experimentDataHash?: Maybe<Scalars['String']>
	searchId: Scalars['String']
	itemId: Scalars['Int']
	campaignId: Scalars['String']
	impressionFeedbackUrls?: Maybe<Scalars['String'][]>
	listing: Listing
}

export interface SellerDeclineReturnInput {
	returnId: Scalars['String']
	declineReturnReason?: Maybe<Scalars['String']>
}

export interface SellerDiscussion {
	__typename?: 'SellerDiscussion'
	id: Scalars['String']
	/** @deprecated Use `buyerId`. */
	buyer_id: Scalars['Int']
	/** @deprecated Use `itemId`. */
	item_id: Scalars['Int']
	/** @deprecated Use `lastMessageText`. */
	last_message_text: Scalars['String']
	/** @deprecated Use `lastPostDate`. */
	last_post_date: Scalars['String']
	buyer: UserProfile
	itemId: Scalars['Int']
	lastMessageText?: Maybe<Scalars['String']>
	lastPostDate: Scalars['String']
	readStatus?: Maybe<DiscussionReadStatus>
	visualTags?: Maybe<VisualTag[]>
}

export interface SellerDiscussionPage {
	__typename?: 'SellerDiscussionPage'
	discussions: SellerDiscussion[]
	next?: Maybe<SellerDiscussionPagingationInfo>
	prev?: Maybe<SellerDiscussionPagingationInfo>
}

export interface SellerDiscussionPagingationInfo {
	__typename?: 'SellerDiscussionPagingationInfo'
	before?: Maybe<Scalars['String']>
	after?: Maybe<Scalars['String']>
	earliest: Scalars['String']
	latest: Scalars['String']
}

export interface SellerDiscussionsInput {
	itemId: Scalars['String']
	before?: Maybe<Scalars['String']>
	after?: Maybe<Scalars['String']>
	earliest?: Maybe<Scalars['String']>
	latest?: Maybe<Scalars['String']>
}

export interface SellerRejectReasonInput {
	transactionId: Scalars['String']
	rejectReason: Scalars['String']
}

export interface SessionToken {
	__typename?: 'SessionToken'
	value: Scalars['String']
	type: Scalars['String']
}

export interface ShippingBuyerMakeOfferInput {
	transactionId: Scalars['String']
	nonce?: Maybe<Scalars['String']>
}

export interface ShippingData {
	__typename?: 'ShippingData'
	transactionId?: Maybe<Scalars['String']>
	transactionState?: Maybe<TransactionState>
	timeToLive?: Maybe<Scalars['String']>
	itemId?: Maybe<Scalars['String']>
	chatThreadId?: Maybe<Scalars['String']>
	shippingPrice?: Maybe<Scalars['String']>
	shippingDeadline?: Maybe<Scalars['String']>
	sellerShippingPrice?: Maybe<Scalars['String']>
	buyerShippingPrice?: Maybe<Scalars['String']>
	sellerId?: Maybe<Scalars['String']>
	sellerAddress?: Maybe<BuyerAddress>
	sellerCommissionRate?: Maybe<Scalars['String']>
	sellerCommissionCost?: Maybe<Scalars['String']>
	sellerMarkShippedTimestamp?: Maybe<Scalars['String']>
	buyerTotalCost?: Maybe<Scalars['String']>
	sellerPayout?: Maybe<Scalars['String']>
	instantPayoutsFee?: Maybe<Scalars['String']>
	buyerId?: Maybe<Scalars['String']>
	buyerOfferPrice?: Maybe<Scalars['String']>
	paymentId?: Maybe<Scalars['String']>
	declineOfferReasons?: Maybe<Scalars['String']>
	isFirstTimeShippingBuyer?: Maybe<Scalars['Boolean']>
	canSendPhotos?: Maybe<Scalars['Boolean']>
	shipmentTrackingNumber?: Maybe<Scalars['String']>
	shipmentTrackingUrl?: Maybe<Scalars['String']>
	shipmentLabelUrl?: Maybe<Scalars['String']>
	offerSummary?: Maybe<ShippingOfferSummary>
	markShippedPromptData?: Maybe<MarkShippedPromptData>
	availableBuyerDiscounts?: Maybe<Maybe<AvailableBuyerShippingDiscount>[]>
	buyerPaymentMethod?: Maybe<PaymentMethod>
	buyerAddress?: Maybe<BuyerAddress>
}

export interface ShippingFilter {
	__typename?: 'ShippingFilter'
	/** @deprecated Use `shippingOnlyFilterEnabled`. */
	shipping_only_filter_enabled?: Maybe<Scalars['Boolean']>
	shippingOnlyFilterEnabled?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `shippingOnlyFilterApplied`. */
	shipping_only_filter_applied?: Maybe<Scalars['Boolean']>
	shippingOnlyFilterApplied?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `intersperseFilterApplied`. */
	intersperse_filter_applied?: Maybe<Scalars['Boolean']>
	intersperseFilterApplied?: Maybe<Scalars['Boolean']>
}

export interface ShippingInfo {
	__typename?: 'ShippingInfo'
	transactionId?: Maybe<Scalars['String']>
	buyerProfile?: Maybe<UserProfile>
	buyerId?: Maybe<Scalars['String']>
}

export interface ShippingLineItem {
	__typename?: 'ShippingLineItem'
	name?: Maybe<Scalars['String']>
	value?: Maybe<Scalars['String']>
}

export interface ShippingOfferSummary {
	__typename?: 'ShippingOfferSummary'
	adjustments?: Maybe<Maybe<ShippingLineItem>[]>
	totalAmount?: Maybe<ShippingLineItem>
	offerPrice?: Maybe<ShippingLineItem>
}

export interface ShippingOption {
	__typename?: 'ShippingOption'
	name?: Maybe<Scalars['String']>
	priority?: Maybe<Scalars['String']>
	price?: Maybe<Scalars['String']>
	minHandlingDays?: Maybe<Scalars['Int']>
	maxHandlingDays?: Maybe<Scalars['Int']>
	minShippingDays?: Maybe<Scalars['Int']>
	maxShippingDays?: Maybe<Scalars['Int']>
}

export interface ShippingOptionInput {
	name?: Maybe<Scalars['String']>
	priority: Scalars['String']
	price?: Maybe<Scalars['String']>
	minHandlingDays?: Maybe<Scalars['Int']>
	maxHandlingDays?: Maybe<Scalars['Int']>
	minShippingDays?: Maybe<Scalars['Int']>
	maxShippingDays?: Maybe<Scalars['Int']>
}

export interface ShippingParcel {
	__typename?: 'ShippingParcel'
	id: Scalars['ID']
	imageUrl: Scalars['String']
	imageTitle: Scalars['String']
	imageSubTitle: Scalars['String']
	imageDescription: Scalars['String']
}

export interface ShippingPostingInfo {
	__typename?: 'ShippingPostingInfo'
	shippingSellerCommissionRate: Scalars['String']
	instantPayoutsFreeTrialEndTime: Scalars['String']
	shippingSellerMaxItemPrice: Scalars['String']
	shippingSellerMinItemPrice: Scalars['String']
	shopNationwideDisabledItemLists: Scalars['Int'][]
	shippingDisabledCategories: Scalars['Int'][]
	parcels: ShippingParcel[]
}

export interface ShippingRate {
	__typename?: 'ShippingRate'
	priority: Scalars['String']
	price?: Maybe<Scalars['String']>
	minDeliveryDays?: Maybe<Scalars['Int']>
	maxDeliveryDays?: Maybe<Scalars['Int']>
	minEstimatedDeliveryDate?: Maybe<Scalars['String']>
	maxEstimatedDeliveryDate?: Maybe<Scalars['String']>
}

export interface ShippingReturnData {
	__typename?: 'ShippingReturnData'
	returnId?: Maybe<Scalars['String']>
	paymentId?: Maybe<Scalars['String']>
	itemId?: Maybe<Scalars['Int']>
	itemTitle?: Maybe<Scalars['String']>
	itemPrice?: Maybe<Scalars['Float']>
	sellerPayout?: Maybe<Scalars['Float']>
	returnAmount?: Maybe<Scalars['Float']>
	buyerDebitAmount?: Maybe<Scalars['Float']>
	itemImageUrl?: Maybe<Scalars['String']>
	buyerName?: Maybe<Scalars['String']>
	buyerEmail?: Maybe<Scalars['String']>
	buyerImageUrl?: Maybe<Scalars['String']>
	inspectionExpirationTime?: Maybe<Scalars['String']>
	buyerRequestReturnWindowDays?: Maybe<Scalars['Int']>
	buyerRequestReturnExpirationTime?: Maybe<Scalars['String']>
	sellerAcceptReturnWindowDays?: Maybe<Scalars['Int']>
	sellerAcceptReturnExpirationTime?: Maybe<Scalars['String']>
	buyerRequestReturnTime?: Maybe<Scalars['String']>
	returnReason?: Maybe<Scalars['String']>
	returnReasonDescription?: Maybe<Scalars['String']>
	inspectionWindowDays?: Maybe<Scalars['Int']>
	sellerImageUrl?: Maybe<Scalars['String']>
	showCanSendPhotosLabel?: Maybe<Scalars['Int']>
	buyerProtectionClaimWindowDays?: Maybe<Scalars['Int']>
	buyerProtectionClaimExpirationTime?: Maybe<Scalars['String']>
	returnReasonOptions?: Maybe<Maybe<ShippingReturnReasonOptions>[]>
}

export interface ShippingReturnReasonOptions {
	__typename?: 'ShippingReturnReasonOptions'
	title?: Maybe<Scalars['String']>
	subtitle?: Maybe<Scalars['String']>
	returnFlow?: Maybe<Scalars['String']>
	bpClaimReason?: Maybe<Scalars['String']>
}

export interface ShippingReturnView {
	__typename?: 'ShippingReturnView'
	returnView?: Maybe<ReturnViewState>
	returnData?: Maybe<ShippingReturnData>
}

export interface ShippingSummary {
	__typename?: 'ShippingSummary'
	itemId?: Maybe<Scalars['Int']>
	buyerId?: Maybe<Scalars['Int']>
	sellerId?: Maybe<Scalars['Int']>
	paymentId?: Maybe<Scalars['Int']>
	canSendPhotos?: Maybe<Scalars['Int']>
	shippingContext?: Maybe<ShippingSummaryContext>
}

export interface ShippingSummaryContext {
	__typename?: 'ShippingSummaryContext'
	canShipToBuyer?: Maybe<Scalars['Int']>
	buyNowEnabled?: Maybe<Scalars['Int']>
	shippingCost?: Maybe<Scalars['Float']>
	shippingDeadline?: Maybe<Scalars['String']>
	availableBuyerDiscounts?: Maybe<AvailableBuyerShippingDiscount[]>
}

export interface ShippingWimmData {
	__typename?: 'ShippingWIMMData'
	itemInfo?: Maybe<ShippingWimmItemInfo>
	viewInfo?: Maybe<ShippingWimmViewInfo>
	paymentInfo?: Maybe<ShippingWimmPaymentInfo>
	shippingInfo?: Maybe<ShippingInfo>
}

export interface ShippingWimmItemInfo {
	__typename?: 'ShippingWIMMItemInfo'
	itemId?: Maybe<Scalars['Int']>
	itemImage?: Maybe<Scalars['String']>
	itemPrice?: Maybe<Scalars['Float']>
	itemTitle?: Maybe<Scalars['String']>
}

export interface ShippingWimmPaymentInfo {
	__typename?: 'ShippingWIMMPaymentInfo'
	id?: Maybe<Scalars['Int']>
	paymentStatus?: Maybe<Scalars['Int']>
	sellerPayoutAmount?: Maybe<Scalars['Float']>
	paymentDate?: Maybe<Scalars['String']>
	commissionAmount?: Maybe<Scalars['Float']>
	commissionRate?: Maybe<Scalars['Float']>
	instantPayoutsFee?: Maybe<Scalars['Float']>
	buyerOfferPrice?: Maybe<Scalars['Float']>
	depositAccount?: Maybe<DepositMethod>
}

export interface ShippingWimmViewInfo {
	__typename?: 'ShippingWIMMViewInfo'
	buyerImage?: Maybe<Scalars['String']>
	buyerName?: Maybe<Scalars['String']>
	learnMoreLink?: Maybe<Scalars['String']>
	actionButtonText?: Maybe<Scalars['String']>
	actionButtonLink?: Maybe<Scalars['String']>
	statusTitle?: Maybe<Scalars['String']>
	statusBody?: Maybe<Scalars['String']>
	statusWarningLevel?: Maybe<Scalars['String']>
	bannerText?: Maybe<Scalars['String']>
	hideReceipt?: Maybe<Scalars['Int']>
}

export interface SocialSummary {
	__typename?: 'SocialSummary'
	/** @deprecated Use `followersCount`. */
	followers_count: Scalars['Int']
	followersCount: Scalars['Int']
	/** @deprecated Use `followingCount`. */
	following_count: Scalars['Int']
	followingCount: Scalars['Int']
	/** @deprecated Use `followerIds`. */
	follower_ids: Scalars['Int'][]
	followerIds: Scalars['Int'][]
	/** @deprecated Use `followingIds`. */
	following_ids: Scalars['Int'][]
	followingIds: Scalars['Int'][]
}

export interface StarAttributes {
	__typename?: 'StarAttributes'
	stars: Scalars['Int']
	attributes: Scalars['String'][]
}

export interface Status {
	__typename?: 'Status'
	status?: Maybe<Scalars['String']>
	message?: Maybe<Scalars['String']>
	code?: Maybe<Scalars['Int']>
	server_time?: Maybe<Scalars['String']>
}

export interface StatusMilestone {
	__typename?: 'StatusMilestone'
	state?: Maybe<ReceiptMilestoneState>
	title?: Maybe<Scalars['String']>
	subTitle?: Maybe<Scalars['String']>
	alertLevel?: Maybe<Scalars['String']>
}

export interface SubmitReportInput {
	type: ReportReasonType
	id: Scalars['ID']
	reasonId: Scalars['ID']
	otherText?: Maybe<Scalars['String']>
}

export interface SuggestedMessage {
	__typename?: 'SuggestedMessage'
	text: Scalars['String']
	id: Scalars['ID']
}

export interface SuggestedMessageResponse {
	__typename?: 'SuggestedMessageResponse'
	suggestions?: Maybe<SuggestedMessage[]>
	threadInfo?: Maybe<Discussion>
}

export interface Suggestion {
	__typename?: 'Suggestion'
	type: Scalars['String']
	label: Scalars['String']
	subLabel?: Maybe<Scalars['String']>
	actionPath: Scalars['String']
	preposition?: Maybe<Scalars['String']>
}

export interface SuggestionResponse {
	__typename?: 'SuggestionResponse'
	suggestions: Maybe<Suggestion>[]
	prefix: Scalars['String']
}

export interface SuggestMeetupSpotInput {
	id: Scalars['String']
	spotId: Scalars['String']
	status: Scalars['String']
	stateHash: Scalars['String']
}

export interface SystemMessageAction {
	__typename?: 'SystemMessageAction'
	actionPath?: Maybe<Scalars['String']>
	externalURL?: Maybe<Scalars['String']>
	actionText?: Maybe<Scalars['String']>
}

export interface SystemMessageContext {
	__typename?: 'SystemMessageContext'
	iconUrl?: Maybe<Scalars['String']>
	actions?: Maybe<SystemMessageAction[]>
	titleText?: Maybe<Scalars['String']>
	bodyText?: Maybe<Scalars['String']>
}

export interface TermsOfService {
	__typename?: 'TermsOfService'
	activationDateGlobal: Scalars['String']
	privacyPolicy: Scalars['String']
	terms: Scalars['String']
}

export interface TrackingDetails {
	__typename?: 'TrackingDetails'
	trackingUrl?: Maybe<Scalars['String']>
}

export interface TransactionHistory {
	__typename?: 'TransactionHistory'
	orderId?: Maybe<Scalars['String']>
	paymentId?: Maybe<Scalars['Int']>
	itemImageUrl?: Maybe<Scalars['String']>
	sellerId?: Maybe<Scalars['Int']>
	merchantId?: Maybe<Scalars['String']>
	purchaseDate?: Maybe<Scalars['String']>
	itemTitle?: Maybe<Scalars['String']>
	purchaseAmount?: Maybe<Scalars['String']>
	payoutAmount?: Maybe<Scalars['String']>
	isShippingTransaction?: Maybe<Scalars['Boolean']>
	isPaymentPending?: Maybe<Scalars['Boolean']>
}

export enum TransactionState {
	Created = 'CREATED',
	BuyerMadeOffer = 'BUYER_MADE_OFFER',
	BuyerCanceledOffer = 'BUYER_CANCELED_OFFER',
	SellerAcceptedOffer = 'SELLER_ACCEPTED_OFFER',
	SellerRejectedOffer = 'SELLER_REJECTED_OFFER',
	SellerCanceledSale = 'SELLER_CANCELED_SALE',
	ItemShipped = 'ITEM_SHIPPED',
	ItemDelivered = 'ITEM_DELIVERED',
	SellerAcceptedOfferReview = 'SELLER_ACCEPTED_OFFER_REVIEW',
	BuyerFraudReview = 'BUYER_FRAUD_REVIEW',
	ItemDeliveryFailed = 'ITEM_DELIVERY_FAILED',
}

export interface Trim {
	__typename?: 'Trim'
	name: Scalars['String']
	vehicles: Vehicle[]
}

export interface TruYouApplication {
	__typename?: 'TruYouApplication'
	applicantId?: Maybe<Scalars['ID']>
}

export interface UnseenAlertCount {
	__typename?: 'UnseenAlertCount'
	total: Scalars['Int']
	inbox: Scalars['Int']
	notifications: Scalars['Int']
}

export interface UpdateAddressInput {
	orderId: Scalars['String']
	address: AddressInput
}

export interface UpdateAppResponse {
	__typename?: 'UpdateAppResponse'
	updateType?: Maybe<UpdateType>
	playStoreUrl?: Maybe<Scalars['String']>
	appStoreUrl?: Maybe<Scalars['String']>
}

export interface UpdateOfferPriceInput {
	transactionId: Scalars['String']
	offerPrice: Scalars['Float']
}

export interface UpdatePaymentMethodInput {
	transactionId: Scalars['String']
	paymentMethodId: Scalars['Int']
}

export interface UpdateReadDateInput {
	userId: Scalars['ID']
	discussionId: Scalars['String']
	lastPostDate: Scalars['String']
}

export interface UpdateShippingAddressInput {
	transactionId: Scalars['String']
	name: Scalars['String']
	street1: Scalars['String']
	street2?: Maybe<Scalars['String']>
	city: Scalars['String']
	state: Scalars['String']
	zip: Scalars['String']
	country: Scalars['String']
}

export enum UpdateType {
	Optional = 'Optional',
	Forced = 'Forced',
	None = 'None',
}

export interface UpdateUserAccountInput {
	name?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	zipCode?: Maybe<Scalars['String']>
	phoneNumber?: Maybe<Scalars['String']>
	newsletter?: Maybe<Scalars['Boolean']>
}

export interface UseInventoryItemPromoInput {
	promotionId: Scalars['String']
	updatedItemId: Scalars['Int']
	previousItemId?: Maybe<Scalars['Int']>
}

export interface User {
	__typename?: 'User'
	id: Scalars['Int']
	sessionToken?: Maybe<SessionToken>
	djangoToken?: Maybe<SessionToken>
	refreshToken?: Maybe<SessionToken>
	profile?: Maybe<UserProfile>
	account?: Maybe<UserAccount>
	/** @deprecated Use `postDate`. */
	archived_items?: Maybe<Listing[]>
	archivedItems?: Maybe<Listing[]>
	inbox?: Maybe<DiscussionNotification[]>
	notifications?: Maybe<Scalars['String'][]>
	truYouApplication?: Maybe<TruYouApplication>
}

export interface UserAccount {
	__typename?: 'UserAccount'
	/** @deprecated Use `facebookId`. */
	facebook_id?: Maybe<Scalars['String']>
	facebookId?: Maybe<Scalars['String']>
	email: Scalars['String']
	identityAttributes?: Maybe<IdentityAttributes>
	/** @deprecated Use `isPaymentsEnabled`. */
	is_payments_enabled?: Maybe<Scalars['Boolean']>
	isPaymentsEnabled?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `isTermsAccepted`. */
	is_terms_accepted?: Maybe<Scalars['Boolean']>
	isTermsAccepted?: Maybe<Scalars['Boolean']>
}

export interface UserConnection {
	__typename?: 'UserConnection'
	title?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	nextPageCursor?: Maybe<Scalars['Int']>
	emptyStateErrorMessage?: Maybe<Scalars['String']>
	followingUsers?: Maybe<Maybe<FollowingUser>[]>
}

export interface UserConnectionInput {
	userId: Scalars['Int']
	pageId: Scalars['Int']
	connectionType?: Maybe<ConnectionType>
}

export interface UserProfile {
	__typename?: 'UserProfile'
	name: Scalars['String']
	/** @deprecated Use `firstName`. */
	first_name?: Maybe<Scalars['String']>
	firstName?: Maybe<Scalars['String']>
	/** @deprecated Use `lastName`. */
	last_name?: Maybe<Scalars['String']>
	lastName?: Maybe<Scalars['String']>
	/** @deprecated Use `ratingSummary`. */
	rating_summary?: Maybe<RatingSummary>
	ratingSummary?: Maybe<RatingSummary>
	avatars: UserProfileAvatars
	/** @deprecated Use `isAutosDealer`. */
	is_autos_dealer?: Maybe<Scalars['Boolean']>
	isAutosDealer?: Maybe<Scalars['Boolean']>
	isSubPrimeDealer?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `dmaMarket`. */
	dma_market?: Maybe<Scalars['String']>
	dmaMarket?: Maybe<Scalars['String']>
	/** @deprecated Use `isTruyouVerified`. */
	is_truyou_verified?: Maybe<Scalars['Boolean']>
	isTruyouVerified?: Maybe<Scalars['Boolean']>
	truYouVerificationStatus?: Maybe<OuTruYouStatus>
	/** @deprecated Use `isPhoneNumberVerified`. */
	is_phone_number_verified?: Maybe<Scalars['Boolean']>
	isPhoneNumberVerified?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `isEmailVerified`. */
	is_email_verified?: Maybe<Scalars['Boolean']>
	isEmailVerified?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `publicLocationName`. */
	public_location_name?: Maybe<Scalars['String']>
	publicLocationName?: Maybe<Scalars['String']>
	/** @deprecated Use `dateJoined`. */
	date_joined?: Maybe<Scalars['String']>
	dateJoined?: Maybe<Scalars['String']>
	phoneNumber?: Maybe<Scalars['String']>
	verified?: Maybe<Scalars['Int']>
	/** @deprecated Use `paymentsVerified`. */
	payments_verified?: Maybe<Scalars['Boolean']>
	paymentsVerified?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `hasFacebook`. */
	has_facebook?: Maybe<Scalars['Boolean']>
	hasFacebook?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `notActive`. */
	not_active?: Maybe<Scalars['Boolean']>
	notActive?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `sellerPaymentEnabled`. */
	seller_payment_enabled?: Maybe<Scalars['Boolean']>
	sellerPaymentEnabled?: Maybe<Scalars['Boolean']>
	/** @deprecated Use `clickToCallEnabled`. */
	click_to_call_enabled?: Maybe<Scalars['Boolean']>
	clickToCallEnabled?: Maybe<Scalars['Boolean']>
	reviews?: Maybe<Maybe<Review>[]>
	openingHours?: Maybe<Maybe<OpeningHour>[]>
	itemsSold?: Maybe<Scalars['String']>
	itemsPurchased?: Maybe<Scalars['String']>
	ratingAttributes?: Maybe<RatingAttribute[]>
	followers?: Maybe<Scalars['Int']>
	badges?: Maybe<UserProfileBadge[]>
	featureAttributes?: Maybe<FeatureAttributes>
	publicLocation?: Maybe<PublicLocation>
	c2cPhoneNumber?: Maybe<C2CPhoneNumber>
	bio?: Maybe<Scalars['String']>
	websiteLink?: Maybe<Scalars['String']>
	responseTime?: Maybe<Scalars['String']>
}

export interface UserProfileAvatars {
	__typename?: 'UserProfileAvatars'
	/** @deprecated Use `squareImage`. */
	square_image: Scalars['String']
	squareImage: Scalars['String']
	/** @deprecated Use `xlImage`. */
	xl_image: Scalars['String']
	xlImage: Scalars['String']
	/** @deprecated Use `backgroundImages`. */
	background_images?: Maybe<Maybe<BackgroundImage>[]>
	backgroundImages?: Maybe<Maybe<BackgroundImage>[]>
	/** @deprecated Use `useDefaultAvatar`. */
	use_default_avatar?: Maybe<Scalars['Boolean']>
	useDefaultAvatar?: Maybe<Scalars['Boolean']>
}

export interface UserProfileBadge {
	__typename?: 'UserProfileBadge'
	tooltipTappableText?: Maybe<Scalars['String']>
	tooltipText?: Maybe<Scalars['String']>
	icon?: Maybe<Scalars['String']>
	actionPath?: Maybe<Scalars['String']>
	label?: Maybe<Scalars['String']>
	type?: Maybe<Scalars['Int']>
}

export interface UserRelation {
	__typename?: 'UserRelation'
	isBlockingOtherUser?: Maybe<Scalars['Boolean']>
	isFollowingOtherUser?: Maybe<Scalars['Boolean']>
	userReportToken?: Maybe<Scalars['String']>
}

export interface UserRelationshipResponse {
	__typename?: 'UserRelationshipResponse'
	following: Scalars['Boolean']
	blocked: Scalars['Boolean']
	blockedInfo?: Maybe<BlockedInfo>
}

export interface UserReview {
	__typename?: 'UserReview'
	text?: Maybe<Scalars['String']>
	profilePhotoUrl?: Maybe<Scalars['String']>
}

export enum VanityLinkType {
	User = 'USER',
	SmallBusiness = 'SMALL_BUSINESS',
}

export interface VanityUrl {
	__typename?: 'VanityUrl'
	url?: Maybe<Scalars['String']>
}

export interface VanityUrlCheckInput {
	url: Scalars['String']
}

export interface VanityUrlCheckResult {
	__typename?: 'VanityUrlCheckResult'
	available: Scalars['Boolean']
}

export interface VanityUrlCreateinput {
	userVanityName: Scalars['String']
	typeId: VanityLinkType
}

export interface VanityUserUrlInput {
	userId: Scalars['Int']
}

export interface Vehicle {
	__typename?: 'Vehicle'
	id: Scalars['String']
	name: Scalars['String']
}

export interface VehicleAttributes {
	__typename?: 'VehicleAttributes'
	vehicleStyleDisplay?: Maybe<Scalars['String']>
	vehicleCityMpg?: Maybe<Scalars['Int']>
	vehicleEpaHighway?: Maybe<Scalars['String']>
	vehicleTransmission?: Maybe<Scalars['String']>
	vehicleOptions?: Maybe<Scalars['String']>
	vehicleEpaCity?: Maybe<Scalars['String']>
	vehicleBody?: Maybe<Scalars['String']>
	vehicleMiles?: Maybe<Scalars['String']>
	vehicleId?: Maybe<Scalars['String']>
	vehicleTitleStatus?: Maybe<Scalars['String']>
	vehicleColor?: Maybe<Scalars['String']>
	vehicleFundamentals?: Maybe<Maybe<Scalars['String']>[]>
	vehicleMake?: Maybe<Scalars['String']>
	vehicleDriveTrain?: Maybe<Scalars['String']>
	vehicleEngineCylinders?: Maybe<Scalars['String']>
	vehicleFuelType?: Maybe<Scalars['String']>
	vehicleYear?: Maybe<Scalars['String']>
	vehicleHighwayMpg?: Maybe<Scalars['Int']>
	vehicleVin?: Maybe<Scalars['String']>
	vehicleTransmissionClean?: Maybe<Scalars['String']>
	vehicleDriveTrainClean?: Maybe<Scalars['String']>
	vehicleModel?: Maybe<Scalars['String']>
	vehicleTrim?: Maybe<Scalars['String']>
	vehicleExternalHistoryReport?: Maybe<VehicleExternalHistoryReport>
}

export interface VehicleExternalHistoryReport {
	__typename?: 'VehicleExternalHistoryReport'
	type?: Maybe<Scalars['String']>
	providerName?: Maybe<Scalars['String']>
	reportUrl?: Maybe<Scalars['String']>
	imageUrl?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	issues?: Maybe<Maybe<Scalars['String']>[]>
	epochDate?: Maybe<Scalars['Int']>
	disclaimer?: Maybe<Scalars['String']>
	price?: Maybe<VehicleReportPrice>
	source?: Maybe<Scalars['String']>
}

export interface VehicleFeaturesResponse {
	__typename?: 'VehicleFeaturesResponse'
	title: Scalars['String']
	features: Scalars['String'][]
	optionCategories: OptionCategories[]
}

export interface VehicleMake {
	__typename?: 'VehicleMake'
	name: Scalars['String']
	vehicleModels: VehicleModel[]
}

export interface VehicleModel {
	__typename?: 'VehicleModel'
	name: Scalars['String']
}

export interface VehicleReportPrice {
	__typename?: 'VehicleReportPrice'
	microUnits?: Maybe<Scalars['Int']>
	currencyCode?: Maybe<Scalars['String']>
}

export interface VehiclesResponse {
	__typename?: 'VehiclesResponse'
	syncToken?: Maybe<Scalars['String']>
	vehicleYears?: Maybe<VehicleYear[]>
	noChange?: Maybe<Scalars['Boolean']>
}

export interface VehicleStylesResponse {
	__typename?: 'VehicleStylesResponse'
	model: Scalars['String']
	make: Scalars['String']
	year: Scalars['String']
	trims: Trim[]
}

export interface VehicleYear {
	__typename?: 'VehicleYear'
	name: Scalars['String']
	vehicleMakes: VehicleMake[]
}

export interface VerifyPhoneCode {
	code: Scalars['Int']
}

export interface VerifyPhoneNumberInput {
	countryCode: Scalars['Int']
	phoneNumber?: Maybe<Scalars['Int']>
	phoneStr?: Maybe<Scalars['String']>
}

export interface VisualTag {
	__typename?: 'VisualTag'
	displayText: Scalars['String']
	tag: Scalars['String']
	type: Scalars['String']
}
