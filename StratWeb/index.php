<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Global Warfare</title>
		<link rel="icon" type="image/x-icon" sizes="256x256" href="./favicon.ico">
		<link rel="icon" type="image/x-icon" href="./favicon.ico">
		<link rel="stylesheet" type="text/css" href="./css/styles.css">
		<link rel="stylesheet" href="./css/map.css">
		<script src="./js/libraries/jquery-3.6.0.min.js" type="text/javascript"></script>
		<script src="./js/util-functions.js" type="text/javascript"></script>
		<script src="./js/libraries/papercore.js" type="text/javascript"></script>
		<script type="module" src="./js/index.js"></script>
	</head>
	<body bgcolor="#113344">
		<header></header>
		<main id="app">
			<audio id="backgroundMusic" src="./sfx/mus-legionnaire.ogg" type="audio/ogg" preload="auto" autoplay muted loop hidden></audio>
			<section class="panel" id="title">
				<div class="top">
					<img src="./img/logo.png" alt="Global Warfare: Modern Conflict">
				</div>
				<div class="bottom">
					<button id="joinGameButton"><?php
//Clicking calls index.js - loadGame()
switch(rand(0,8)){
	case 1: echo "Game On!"; break;
	case 2: echo "Launch Campaign!"; break;
	case 3: echo "Commence Operations!"; break;
	case 4: echo "Engage Hostiles!"; break;
	case 5: echo "Begin Conquest!"; break;
	case 6: echo "Unleash Hell!"; break;
	case 7: echo "Deploy Forces!"; break;
	case 8: echo "Execute Orders!"; break;
	//case 9: echo ""; break;
	default: echo "Get Started!"; break;
}
?></button>
				</div>
			</section>
			<section class="panel scrollable" id="matches" style="display: none;">
				<nav>
					<ul>
						<li><button data-window="join" data-emoji="⚔️">JOIN</button></li>
						<li><button data-window="profile" data-emoji="👥️">Profile</button></li>
						<li><button data-window="comms" data-emoji="📢️">Comms</button></li>
						<li><button data-window="store" data-emoji="🛒 ">Store</button></li>
						<li><button data-window="gw" data-emoji="🎖️">GW</button></li>
					</ul>
				</nav>
				<sidebar id="matchPanel">
					<!-- Infopanel content added dynamically -->
					<section id="activeMatches" class="box">
						<div class="sechead">Recently Joined</div>
						<ul>
							<li>Resource Wars 2077 -- Cascadia →</li>
							<li>Gulf War 1990 -- Kuwait →</li>
							<li>Northern Fury 88 -- USA →</li>
						</ul>
					</section>
					<section id="searchBox">
						<input type="text" placeholder="search">
					</section>
					<section id="runningMatches" class="box">
						<div class="sechead">Quick Join</div>
						<ul>
							<li class="separator">Not Too Distant</li>
							<li>Liberty's Last Stand →<br>
								Defend the American heartland against a relentless multi-pronged invasion by a global coalition.
							</li>
							<li>The Great Awakening 2015 →<br>
								Engage in a war of titans as ancient legends emerge into the 21st century. Direct strike groups against krakens and scramble the air forces to intercept high-altitude dragons in a desperate struggle to prove that modern steel is stronger than ancient magic.
							</li>
							<li class="passe">-- Abyssal Protocol 2027 →<br>
								Maintain your soldiers' sanity as the sky bleeds and reality fractures under an incursion of Lovecraftian horrors. Command elite task forces in a race to stabilize the veil, using experimental weaponry to hold back nightmare entities that defy the very laws of physics.
							</li>
							<li class="separator">Late Cold War</li>
							<li>Northern Fury 88 →<br>
								Seize control of the the North Atlantic. Lead the charge in a brutal struggle for the GIUK Gap, where the victor dictates the flow of reinforcements between the New World and the Old.
							</li>
							<li>Gulf War 1990 →<br>
								Navigate the razor-thin brink of nuclear war during the tense Cold War standoff, where miscalculations can tip the balance toward global catastrophe!</li>
							<li class="passe">--Able Archer 83 →<br>
								Command military forces in a pivotal conflict, where coalition strength is pitted against a formidable adversary in the scorching deserts of the Middle East.
							</li>
							<li class="passe">--Southern Cross 82 →<br>
								Lead a high-stakes maritime campaign in the South Atlantic where a localized territorial dispute spirals into a regional war.
							</li>
							<li class="passe">--August Coup 91 →<br>
								Command hardline Red Army divisions as they crush internal dissent and launch a preemptive strike against NATO, turning the twilight of the Cold War into a global inferno.
							</li>
							<li class="separator">Mid Century</li>
							<li>Operation Blue Sky 49 →<br>
								Defend humankind in a world where the Axis never rose, but the stars fell. Lead a global resistance in 1949 to reclaim Earth from a decade of alien occupation using experimental tech.
							</li>
							<li>Post Apocalyptic 79 →<br>
								Survive and thrive in the desolate aftermath of a global catastrophe, where the remnants of society vie for resources in a harsh unforgiving word.
							</li>
							<li class="separator">SciFi</li>
							<li>Resource Wars 2077 →<br>
								Lead factions in a scorched earth in the year 2077, where survival hinges on strategic resource management and tactical prowess.
							</li>
							<li>Orbital Winter 2081 →<br>
								Engage in a desperate gravity war over Earth's last functional solar arrays. Command desperate 'Sun-Chaser' legions in the high-altitude wastes, where the sky has turned to lead and victory belongs to whoever can seize the falling embers of a dying star.
							</li>
						</ul>
					</section>
				</sidebar>
				<section id="join-window" class="window">
					<h2>Join</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="profile-window" class="window">
					<h2>Profile</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="comms-window" class="window">
					<h2>Comms</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="store-window" class="window">
					<h2>Store</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="gw-window" class="window">
					<h2>GW</h2>
					<button class="close-btn">×</button>
					<div style="width:25%;float:left;">Screen size:</div><div style="width:75%;float:right;" id="window-size">×</div>
				</section>
				<!-- Overlay -->
				<div class="overlay"></div>
			</section>
			<section class="panel" id="game" style="display: none;">
				<div id="infoBar">
					<div><nobr>Squareworld</nobr></div>
					<div><nobr>23:00:00 on Day 64.</nobr></div>
					<div><nobr>9000 VP</nobr></div>
					<div><nobr>Squaristan</nobr></div>
					<div><nobr>{Syndicate} Username</nobr></div>
				</div>
				<canvas id="myCanvas"></canvas>

				<nav>
					<ul>
						<li><button data-window="nation" data-emoji="🏙️">Nation</button></li>
						<li><button data-window="policy" data-emoji="🏛️">Policy</button></li>
						<li><button data-window="upgrades" data-emoji="🛠️">Upgrades</button></li>
						<li><button data-window="exchange" data-emoji="💱">Exchange</button></li>
						<li><button data-window="settings" data-emoji="⚙️">Settings</button></li>
					</ul>
				</nav>
				<sidebar id="infoPanel">
					<!-- Infopanel content added dynamically -->
				</sidebar>
				<section id="nation-window" class="window">
					<h2>Nation</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="policy-window" class="window">
					<h2>Policy</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="upgrades-window" class="window">
					<h2>Upgrades</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="exchange-window" class="window">
					<h2>Exchange</h2>
					<button class="close-btn">×</button>
				</section>
				<section id="settings-window" class="window">
					<h2>Settings</h2>
					<button class="close-btn">×</button>
					Music: <input type=checkbox id="muteMusic" CHECKED> Mute
					<br />
					<div style="width:25%;float:left;">Screen size:</div><div style="width:75%;float:right;" id="window-size">×</div>
				</section>
				<!-- Overlay -->
				<div class="overlay"></div>
			</section>
		</main>
		<footer></footer>
	</body>
</html>