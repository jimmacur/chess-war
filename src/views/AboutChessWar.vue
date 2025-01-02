<template>
  <div>
    <!-- Title -->
    <h1 class="text-4xl font-bold mb-4 text-center">About Chess War</h1>

    <!-- Description -->
    <p class="mb-6 text-lg text-center">
      Chess War is a unique fusion of the age-old card game <strong>War</strong> and the strategic brilliance of <strong>Chess</strong>. It combines the randomness of War with the tactical depth of Chess, creating a game that is both unpredictable and engaging.
    </p>

    <!-- How It Works Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
      <p class="mb-4">In Chess, each piece has a numerical value based on its perceived strength:</p>
      
      <!-- Chess Pieces Table -->
      <table class="w-full text-left border-collapse mb-6">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="px-4 py-2">Piece</th>
            <th class="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-800">
            <td class="px-4 py-2">Pawn</td>
            <td class="px-4 py-2">1</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="px-4 py-2">Knight</td>
            <td class="px-4 py-2">3</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="px-4 py-2">Bishop</td>
            <td class="px-4 py-2">3</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="px-4 py-2">Rook</td>
            <td class="px-4 py-2">5</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="px-4 py-2">Queen</td>
            <td class="px-4 py-2">9</td>
          </tr>
          <tr>
            <td class="px-4 py-2">King</td>
            <td class="px-4 py-2">Priceless</td>
          </tr>
        </tbody>
      </table>
      
      <p class="mb-4">
        At the beginning of the game, the pieces of each side are shuffled, and each piece is assigned a <strong>random value</strong> between 0 and its maximum value.
      </p>

      <div class="p-4 bg-gray-800 rounded mb-6">
        <p class="text-sm">
          <strong>Example:</strong> A Bishop, with a maximum value of 3, could be assigned a random value of 0, 1, 2, or 3 for that round.
        </p>
      </div>
    </div>

    <!-- Gameplay Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Gameplay</h2>
      <ul class="list-disc list-inside">
        <li class="mb-2">
          On each turn, one piece from each side battles the other.
        </li>
        <li class="mb-2">
          The piece with the highest assigned value wins, and the winner adds the <strong>maximum values</strong> of both pieces to their score.
        </li>
        <li>
          In case of a tie, the pieces go to the <em>“War Zone”</em>. The winner of the next round collects all the points.
        </li>
      </ul>

      <div class="p-4 bg-gray-800 rounded mt-4">
        <p class="text-sm">
          <strong>Example:</strong> If a Rook (value: 5) beats a Queen (value: 9), the winner scores 14 points. If two Pawns tie with values of 1, they go to the War Zone.
        </p>
      </div>
    </div>

    <!-- Winning the Game Section -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Winning the Game</h2>
      <p>The game continues until all pieces have battled. The player with the highest total score at the end wins!</p>
    </div>

    <!-- Back Button -->
    <div class="text-center mt-8">
      <router-link to="/" class="btn">
        Back
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "About",
};
</script>