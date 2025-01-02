<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @mousedown.self="$emit('close')"
  >
    <div
      class="bg-gray-500 text-white p-8 rounded-lg shadow-lg max-w-3xl w-full h-4/5 overflow-y-auto relative"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
      ⚔️
      </button>

      <!-- Title -->
      <h1 class="text-4xl font-bold mb-4 text-center">About Chess War</h1>

      <!-- Description -->
      <p class="mb-6 text-lg text-left">
        Chess War is a lighthearted fusion of the age-old card game <strong>War</strong> and the iconic pieces of <strong>Chess</strong>. It brings excitement and unpredictability by combining chance with the familiar values of chess pieces.
      </p>

      <!-- How It Works Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
        <p class="mb-4">
          In Chess, each piece has a numerical value based on its perceived
          strength:
        </p>

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
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-pawn.svg"
                  alt="Black Pawn"
                  class="inline-block h-8 w-6 mr-2"
                />
                Pawn
              </td>
              <td class="px-4 py-2">1</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-bishop.svg"
                  alt="Black Bishop"
                  class="inline-block h-8 w-6 mr-2"
                />
                Bishop
              </td>
              <td class="px-4 py-2">3</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-knight.svg"
                  alt="Black Knight"
                  class="inline-block h-8 w-6 mr-2"
                />
                Knight
              </td>
              <td class="px-4 py-2">3</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-rook.svg"
                  alt="Black Rook"
                  class="inline-block h-8 w-6 mr-2"
                />
                Rook
              </td>
              <td class="px-4 py-2">5</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-queen.svg"
                  alt="Black Queen"
                  class="inline-block h-8 w-6 mr-2"
                />
                Queen
              </td>
              <td class="px-4 py-2">9</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="/src/assets/pieces/black-king.svg"
                  alt="Black King"
                  class="inline-block h-8 w-6 mr-2"
                />
                King
              </td>
              <td class="px-4 py-2">Priceless</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Gameplay Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Gameplay</h2>
        <ul class="list-disc list-inside">
          <li class="mb-2">
            On each turn, one random piece from each side battles the other.
          </li>
          <li class="mb-2">
            Each piece is assigned a random value ranging from <strong>0</strong> to its normal maximum value. 
            <br />
            <br />
            <div class="text-m bg-gray-700 p-2 rounded-lg">
            For example, a rook with a value between <strong>0</strong> and <strong>5</strong> could potentially beat a queen with a value between <strong>0</strong> and <strong>9</strong> if the rook's random value is higher. 
            </div>
            <br />
            The piece with the higher random value wins, and the winner adds the <strong>maximum values</strong> of both pieces to their score.
          </li>
          <li>
            In case of a tie, the pieces go to the <em>“War Zone”</em>. The winner of the next round collects all the points.
          </li>
        </ul>
      </div>

      <!-- Winning Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Winning the Game</h2>
        <p>
          The game continues until all pieces have battled. The player with the
          highest total score at the end wins and earns the King from their opponent!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AboutModal"
};
</script>

<style scoped>

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

</style>